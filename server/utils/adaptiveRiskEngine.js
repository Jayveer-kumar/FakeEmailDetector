// adaptiveRiskEngine.js
// Adaptive, explainable risk engine for MailVerifierX
// - scoreEmail(result, username) -> { score, breakdown, label }
// - provideFeedback(emailContext, true|false) -> adjusts weights (simple online learning)
// - load/save weights (serialize) for persistent learning

// NOTE: persist returned weights object to DB/file between restarts.

const DEFAULT_WEIGHTS = {
  length1: 1.6,        // multiplier for length==1 (higher => more risk)
  length2: 1.2,
  length3: 0.6,
  sequential: 0.8,
  repeating: 0.9,
  gibberish: 0.7,
  numericOnly: 1.1,
  spamKeyword: 0.7,
  realNameBoost: -0.6,
  domainReputationBase: 0.3,
  invalidFormat: 1.2,
  domainMissing: 1.0,
  noMx: 0.9,
  disposable: 1.2,
  catchAll: 0.5,
  usernameSuspiciousFlag: 0.6,
  roleBased: 0.2,
  unpopularDomain: 0.3,
  tempProbabilityWeight: 0.8 // if your pipeline returns tempProbability (0..100)
};

const DEFAULT_TLD_SCORES = {
  // add more TLDs as you like
  "tk": 25,
  "ml": 20,
  "ga": 18,
  "cf": 18,
  "gq": 18,
  "xyz": 8,
  "top": 10,
  "biz": 10,
  "com": -5,
  "org": -2,
  "net": -2,
  "in": 0
};

let WEIGHTS = { ...DEFAULT_WEIGHTS };
let TLD_SCORES = { ...DEFAULT_TLD_SCORES };

// --- small helpers (reuse/replace as needed) ---
function entropy(str) {
  if (!str || str.length === 0) return 0;
  const freq = {};
  for (const c of str) freq[c] = (freq[c] || 0) + 1;
  let e = 0;
  for (const k in freq) {
    const p = freq[k] / str.length;
    e -= p * Math.log2(p);
  }
  return e;
}
function isSequential(s) {
  if (!s) return false;
  const seq = "abcdefghijklmnopqrstuvwxyz0123456789";
  return seq.includes(s) || seq.includes(s.split("").reverse().join(""));
}
function isRepeating(s) {
  return /^([a-zA-Z0-9])\1+$/.test(s);
}
function isNumericOnly(s) {
  return /^[0-9]+$/.test(s);
}
function containsSpamKeyword(s) {
  if (!s) return false;
  const list = ["test","temp","demo","spam","bot","fake","sample","mail","noreply","no-reply"];
  s = s.toLowerCase();
  return list.some(k => s === k || s.startsWith(k) || s.includes(k));
}
function looksLikeName(s) {
  if (!s) return false;
  const list = ["john","rahul","raj","sita","mohan","smith","lee","maria","jane","amit"];
  s = s.toLowerCase();
  return list.some(n => s.includes(n));
}
function getTldScore(domain) {
  if (!domain) return 0;
  const t = domain.split(".").pop().toLowerCase();
  return TLD_SCORES[t] || 0;
}

// normalize result inputs
function safeNum(v, fallback = 0) {
  return typeof v === "number" && Number.isFinite(v) ? v : fallback;
}

// --- main scoring function ---
// result: the pipeline result object (domainExists, hasMxRecord, isDisposable, catchAll, isSuspicious, tempProbability, isPopularProvider, isRoleBased, etc.)
// username: local part of the email (string)
// options: { explain: true/false } returns breakdown if explain true
export function scoreEmail(result, username, options = { explain: true }) {
  username = String(username || "").toLowerCase();
  const explain = options.explain !== false;
  const breakdown = {};

  // base raw contributions (unweighted)
  let raw = 0;

  // username length contributions (raw points)
  if (username.length <= 1) raw += 80 * WEIGHTS.length1;
  else if (username.length === 2) raw += 60 * WEIGHTS.length2;
  else if (username.length === 3) raw += 30 * WEIGHTS.length3;

  breakdown.length = raw;

  // sequential
  if (isSequential(username)) { raw += 30 * WEIGHTS.sequential; breakdown.sequential = true; }

  // repeating
  if (isRepeating(username)) { raw += 25 * WEIGHTS.repeating; breakdown.repeating = true; }

  // entropy/gibberish
  const ent = entropy(username);
  if (ent > 3.4) { raw += 20 * WEIGHTS.gibberish; breakdown.gibberish = true; }
  breakdown.entropy = ent;

  // numeric-only
  if (isNumericOnly(username)) { raw += 40 * WEIGHTS.numericOnly; breakdown.numericOnly = true; }

  // spam keywords
  if (containsSpamKeyword(username)) { raw += 20 * WEIGHTS.spamKeyword; breakdown.spamKeyword = true; }

  // looks like real name => reduce
  if (looksLikeName(username)) { raw -= 20 * Math.abs(WEIGHTS.realNameBoost); breakdown.realNameBoost = true; }

  // domain reputation/TLD
  const tldScore = getTldScore(result.domain || (result.email || "").split("@")[1]);
  raw += tldScore * WEIGHTS.domainReputationBase;
  breakdown.tldScore = tldScore;

  // pipeline flags
  if (!result.isValidFormat) { raw += 40 * WEIGHTS.invalidFormat; breakdown.invalidFormat = true; }
  if (result.domainExists === false) { raw += 40 * WEIGHTS.domainMissing; breakdown.domainMissing = true; }
  if (!result.hasMxRecord) { raw += 30 * WEIGHTS.noMx; breakdown.noMx = true; }
  if (result.isDisposable) { raw += 30 * WEIGHTS.disposable; breakdown.disposable = true; }
  if (result.catchAll) { raw += 10 * WEIGHTS.catchAll; breakdown.catchAll = true; }
  if (result.isSuspicious) { raw += 20 * WEIGHTS.usernameSuspiciousFlag; breakdown.isSuspicious = true; }
  if (result.isRoleBased) { raw += 5 * WEIGHTS.roleBased; breakdown.isRoleBased = true; }
  if (!result.isPopularProvider) { raw += 10 * WEIGHTS.unpopularDomain; breakdown.unpopularDomain = true; }

  // tempProbability if provided by your temp detector (0..100)
  if (typeof result.tempProbability === "number") {
    raw += (result.tempProbability / 100) * 100 * WEIGHTS.tempProbabilityWeight; // scale into 0..100 then weight
    breakdown.tempProbability = result.tempProbability;
  }

  // Normalize raw to 0..100 and round
  let finalScore = Math.round(Math.max(0, Math.min(100, raw)));

  // Explainable label
  const label = finalScore >= 80 ? "High Risk"
              : finalScore >= 50 ? "Medium Risk"
              : finalScore >= 20 ? "Low Risk"
              : "Very Low Risk";

  const out = { score: finalScore, label };
  if (explain) out.breakdown = breakdown;
  return out;
}

// --- Simple online learning / feedback update ---
// Accepts `context` which should be { result, username } and `isFake` boolean (true=labelled fake/abusive)
// We apply tiny updates to weights based on error between predicted and label
export function provideFeedback(context, isFake, options = { lr: 0.05 }) {
  // context: { result, username }
  const { result, username } = context;
  const pred = scoreEmail(result, username, { explain: false });
  const yPred = pred.score / 100; // 0..1
  const yTrue = isFake ? 1 : 0;
  const err = yTrue - yPred; // positive if we underpredicted fake

  // update strategy: if error positive, increase weights for features present; else decrease
  const alpha = safeNum(options.lr, 0.05);

  // helper to nudge scalar weight
  function nudgew(prop, present) {
    if (!(prop in WEIGHTS)) return;
    const delta = alpha * (present ? 1 : -0.1) * err * 1.0;
    WEIGHTS[prop] = Math.max(0, WEIGHTS[prop] + delta);
  }

  // Determine feature presence similar to scoring
  const uname = String(username || "").toLowerCase();
  nudgew('length1', uname.length <= 1);
  nudgew('length2', uname.length === 2);
  nudgew('length3', uname.length === 3);
  nudgew('sequential', isSequential(uname));
  nudgew('repeating', isRepeating(uname));
  nudgew('gibberish', entropy(uname) > 3.4);
  nudgew('numericOnly', isNumericOnly(uname));
  nudgew('spamKeyword', containsSpamKeyword(uname));
  nudgew('realNameBoost', looksLikeName(uname));
  nudgew('domainReputationBase', true); // always slight adjust
  nudgew('invalidFormat', !result.isValidFormat);
  nudgew('domainMissing', result.domainExists === false);
  nudgew('noMx', !result.hasMxRecord);
  nudgew('disposable', result.isDisposable === true);
  nudgew('catchAll', result.catchAll === true);
  nudgew('usernameSuspiciousFlag', result.isSuspicious === true);
  nudgew('roleBased', result.isRoleBased === true);
  nudgew('unpopularDomain', !result.isPopularProvider);
  nudgew('tempProbabilityWeight', typeof result.tempProbability === "number");

  // return new weights so caller can persist them
  return { ...WEIGHTS };
}

// --- utility: load/save weights (caller persist to DB/file) ---
export function getWeights() {
  return { ...WEIGHTS, tldScores: { ...TLD_SCORES } };
}
export function setWeights(obj) {
  if (!obj) return;
  for (const k of Object.keys(WEIGHTS)) if (k in obj) WEIGHTS[k] = obj[k];
  if (obj.tldScores) TLD_SCORES = { ...TLD_SCORES, ...obj.tldScores };
  return getWeights();
}

// --- export default convenience ----
export default {
  scoreEmail,
  provideFeedback,
  getWeights,
  setWeights
};

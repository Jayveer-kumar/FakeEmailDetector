function looksLikeNameFallback(username) {
  const names = ["lee","maria","jane","test","test1","test2","admin","qwerty","abc","xyz" , "asdf", "zxcv","user","user1","user2","guest","temp","sample","sample1","sample2","foo","bar","mail","fake" ];
  username = String(username || "").toLowerCase();
  // check if username contains a common name token
  return names.some(n => username.includes(n));
}

function isGenericTestName(username) {
  return /^(test|tester|testing|demo|sample|user|admin|root)\d*$/.test(username);
}


function getConfidenceMessage(result) {
  // Hard-fail cases — ye technically provable hain, confidently bol sakte hain
  if (!result.domainExists) {
    return {
      level: "invalid",
      text: "❌ This email domain does not exist. This email is invalid."
    };
  }

  if (!result.hasMxRecord) {
    return {
      level: "invalid",
      text: "❌ This domain has no mail server configured — email cannot receive mail."
    };
  }

  // Ab tak domain bhi exist karta hai aur MX bhi hai — asli "valid/invalid" nahi keh sakte,
  // sirf confidence dikhayenge riskScore ke basis pe
  const score = result.riskScore ?? 0;

  if (score <= 20) {
    return {
      level: "high-confidence",
      text: "✔ This email looks valid and trustworthy."
    };
  }
  if (score <= 50) {
    return {
      level: "medium-confidence",
      text: "⚠ This email looks valid, but couldn't be fully verified."
    };
  }
  if (score <= 80) {
    return {
      level: "low-confidence",
      text: "⚠ This email has several risk signals — proceed with caution."
    };
  }
  return {
    level: "very-low-confidence",
    text: "❌ This email is likely invalid or fake."
  };
}

function buildUserResponse(result) {
  const messages = [];
  const highlights = []; // structured notes for UI (badges, colors, etc.)
  const confidence = getConfidenceMessage(result);

  const email = result.email || "";
  const username = (email.split("@")[0] || "").toLowerCase();

  // Basic checks
  if (result.isValidFormat) messages.push("✔ Email format is valid.");
  else messages.push("❌ Email format is invalid.");

  if (result.domainExists) messages.push("✔ Domain exists and is reachable.");
  else messages.push("❌ Domain does not exist.");

  if (result.hasMxRecord) messages.push("✔ Mail server (MX record) found.");
  else messages.push("❌ No mail server found for this email.");

  messages.push(result.isDisposable
    ? "⚠ This is a disposable / temporary email."
    : "✔ This is not a disposable email.");

  // Suspicious patterns (existing)
  if (result.isSuspicious || (result.breakdown && result.breakdown.spamKeyword)) {
    const reason = result.suspiciousReason || (result.breakdown && result.breakdown.spamKeyword ? "spam-like keywords" : "pattern match");
    messages.push(`⚠ Suspicious pattern detected: ${reason}`);
    highlights.push({ type: "suspicious-pattern", reason });
  } else {
    messages.push("✔ No suspicious patterns found.");
  }

  // Role based
  messages.push(result.isRoleBased
    ? `⚠ This is a role-based email (e.g. info/support).`
    : "✔ This is a personal email.");

  // Provider info
  if (result.isFreeProvider) messages.push("✔ Free email provider detected.");
  if (result.isPaidProvider) messages.push("✔ Paid/hosted provider detected.");

  // Risk score
  messages.push(`🔐 Risk Score: ${result.riskScore} (${result.riskLabel})`);

  // --- NEW: Fake / impersonation / generic-name detection ---
  // Strategy:
  //  - if username is clearly generic/test (test/demo/user/admin) -> highlight
  //  - if username "looks like a name" but other signals disagree (low entropy + suspicious) -> mark possible impersonation
  //  - if breakdown has any 'realNameBoost' or your classifier, use that instead (not present in example)
  let nameFlagged = false;

  // 1: explicit generic test name
  if (isGenericTestName(username)) {
    nameFlagged = true;
    messages.push("⚠ Username is a generic/test name (e.g. 'test', 'demo', 'admin') — likely not a real user.");
    highlights.push({ type: "generic-name", confidence: "high", username });
  }

  // 2: real-name pattern but with suspicious signals (low entropy or spamKeyword)
  const ent = result.breakdown && typeof result.breakdown.entropy === "number" ? result.breakdown.entropy : null;
  const spamKw = result.breakdown && result.breakdown.spamKeyword;
  const looksLikeName = (typeof classifyUsername === "function")
                        ? classifyUsername(username).looksLikeName // if you have classifier
                        : looksLikeNameFallback(username);

  if (!nameFlagged && looksLikeName) {
    // if username looks like a name but entropy is very low or suspicious keywords present -> possible fake/impersonation
    if ((ent !== null && ent < 2.2) || spamKw || result.isSuspicious) {
      nameFlagged = true;
      messages.push("⚠ Username looks like a (common) name but other signals suggest it may be fake or auto-generated.");
      highlights.push({ type: "possible-impersonation", confidence: "medium", username });
    } else {
      // normal-looking name
      messages.push("✔ Username looks like a personal name.");
    }
  }

  // 3: mixed alnum with suspicious characters (john123, mike_999) -> suspicious low-confidence impersonation
  if (!nameFlagged && /[a-zA-Z]+\d{2,}/.test(username)) {
    messages.push("⚠ Username contains a name + numbers (e.g. 'john123') — sometimes used by disposable/bot accounts.");
    highlights.push({ type: "name-with-numbers", confidence: "low", username });
  }

  // Provide short 'summary' string for UI header
  const summary = `${result.riskLabel} — ${result.riskScore}/100`;

  return {
    email,
    riskScore: result.riskScore,
    riskLabel: result.riskLabel,
    summary,
    confidence,
    messages,
    highlights,
    raw: result // keep raw if client wants details
  };
}
export default buildUserResponse;


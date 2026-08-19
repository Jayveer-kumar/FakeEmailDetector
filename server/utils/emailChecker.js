import dns from "dns";
dns.setDefaultResultOrder("ipv4first");
import validator from "email-validator";
// import disposableList from "./disposableList.json"  assert { type: "json"  };
// import popularProviderList from "./popularProviderList.json" assert { type: "json" };
import disposableList from "./disposableList.json"  with { type: "json"  };
import popularProviderList from "./popularProviderList.json" with { type: "json" };
import domainChecker from "./domainChecker.js";
import isCatchAllDomain from "./catchAllChecker.js";
import checkRoleBasedEmail from "./checkRoleBased.js";
import checkFreeVsPaid from "./checkFreeVSPaid.js";
import checkSuspiciousPattern from "./suspiciousChecker.js";
import adaptive from "./adaptiveRiskEngine.js";

async function checkEmail(email) {
  const username = email.split("@")[0].toLowerCase();
  const domain = email.split("@")[1]?.trim().toLowerCase();

  const result = {
    email,
    isValidFormat: validator.validate(email),
    domainExists: false,
    hasMxRecord: false,
    isDisposable: false,
    isPopularProvider: false,
    catchAll: false,
    isSuspicious: false,
    suspiciousReason: "",
    isRoleBased: false,
    roleReason: "",
    isFreeProvider: false,
    isPaidProvider: false,
    provider: "",
    tempProbability: 0,
    riskScore : 0,
    riskLabel : "Unknown"
  };

  // Role–based
  const rb = checkRoleBasedEmail(email);
  result.isRoleBased = rb.isRoleBased;
  result.roleReason = rb.roleReason;

  if (!domain) {
    result.domainExists = false;
    result.hasMxRecord = false;
    result.isValidFormat = false;
    result.suspiciousReason = "Invalid or incomplete email (missing @domain)";
    result.isSuspicious = true;
    result.riskScore = 100;
    result.riskLabel = "High Risk";
    return result;
  }

  // Domain exists?
  result.domainExists = await domainChecker(domain);
  if (!result.domainExists) {
    result.suspiciousReason = "Domain does not exist or is unreachable";
    result.isSuspicious = true;
    result.riskScore = 100;           
    result.riskLabel = "High Risk";
    return result;
  }

  // MX record
  let mxRecords;
  try {
    mxRecords = await dns.promises.resolveMx(domain);
    result.hasMxRecord = true;
  } catch {
    result.hasMxRecord = false;
    result.suspiciousReason = "No mail server (MX record) found for this domain";
    result.isSuspicious = true;
    result.riskScore = 90;            
    result.riskLabel = "High Risk"; 
    return result;
  }

  // Catch–all
  try {
    result.catchAll = await isCatchAllDomain(domain);
  } catch {
    result.catchAll = false;
  }

  // Disposable
  result.isDisposable = disposableList.includes(domain);

  // Popular provider
  result.isPopularProvider = popularProviderList.includes(domain);

  // === Adaptive Risk Engine ===
  const risk = adaptive.scoreEmail(result, username, { explain: true });
  const suspicious = checkSuspiciousPattern(email);
  result.isSuspicious = suspicious.isSuspicious;
  result.suspiciousReason = suspicious.suspiciousReason;
  const { isFreeProvider, isPaidProvider, provider } = checkFreeVsPaid(
    domain,
    mxRecords
  );
  result.isFreeProvider = isFreeProvider;
  result.isPaidProvider = isPaidProvider;
  result.provider = provider;

  // Attach to response
  result.riskScore = risk.score;
  result.riskLabel = risk.label;
  result.breakdown = risk.breakdown;

  return result;
}

export default checkEmail;



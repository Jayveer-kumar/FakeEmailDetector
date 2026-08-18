import checkEmail from "../utils/emailChecker.js";
import buildUserResponse from "../utils/buildUserResponse.js";
import EmailLog from "../models/EmailLog.js";

export const checkUserEmail = async (req , res , next) => {
  const { email } = req.body;
  console.log("Request Recieved  : ");
  const result = await checkEmail(email);

  let output = buildUserResponse(result);

  // Database me save (fire-and-forget — client ko wait mat karao)
  const domain = email?.split("@")[1]?.trim().toLowerCase();

  EmailLog.create({
    email: output.email,
    domain,
    status: output.confidence?.level === "invalid" ? "invalid"
          : output.confidence?.level === "high-confidence" ? "valid"
          : "risky",
    isValidFormat: result.isValidFormat,
    domainExists: result.domainExists,
    hasMxRecord: result.hasMxRecord,
    isDisposable: result.isDisposable,
    isPopularProvider: result.isPopularProvider,
    catchAll: result.catchAll,
    isRoleBased: result.isRoleBased,
    roleReason: result.roleReason,
    isFreeProvider: result.isFreeProvider,
    isPaidProvider: result.isPaidProvider,
    provider: result.provider,
    isSuspicious: result.isSuspicious,
    suspiciousReason: result.suspiciousReason,
    tempProbability: result.tempProbability,
    riskScore: result.riskScore,
    riskLabel: result.riskLabel,
    breakdown: result.breakdown,
  }).catch(err => console.error("EmailLog save failed:", err));

  return res.json({ 
    email: output.email,
    riskScore: output.riskScore,
    riskLabel : output.riskLabel,
    confidence : output.confidence,
    messages: output.messages,
    summary: output.summary,
    highlights: output.highlights,
    raw: output.raw
   });
}
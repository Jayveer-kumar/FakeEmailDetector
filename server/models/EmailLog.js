import mongoose from "mongoose";

const EmailLogSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, lowercase: true, trim: true },
    domain: { type: String, lowercase: true, trim: true }, // 👈 alag field — group/filter easy

    // Quick-filter ke liye status (confidence.level se map hoga)
    status: {
      type: String,
      enum: ["valid", "invalid", "risky", "unknown"], // 👈 tabs/filter buttons ke liye
      default: "unknown",
    },

    // Essential checks
    isValidFormat: Boolean,
    domainExists: Boolean,
    hasMxRecord: Boolean,
    isDisposable: Boolean,
    isPopularProvider: Boolean,
    catchAll: Boolean,
    isRoleBased: Boolean,
    roleReason: String,
    isFreeProvider: Boolean,
    isPaidProvider: Boolean,
    provider: String,
    isSuspicious: Boolean,
    suspiciousReason: String,
    tempProbability: Number,

    riskScore: { type: Number, min: 0, max: 100 },
    riskLabel: String,
    breakdown: Object,
  },
  {
    timestamps: true, // 👈 createdAt/updatedAt auto — manual "timestamp" field hata do
  }
);

// === Indexes — admin panel fast rehne ke liye zaroori ===
EmailLogSchema.index({ createdAt: -1 });        // date range filter/sort
EmailLogSchema.index({ riskScore: -1 });        // risk se sort
EmailLogSchema.index({ status: 1 });            // valid/invalid/risky filter
EmailLogSchema.index({ domain: 1 });            // domain-wise grouping
EmailLogSchema.index({ email: "text" });        // email search

export default mongoose.model("EmailLog", EmailLogSchema);
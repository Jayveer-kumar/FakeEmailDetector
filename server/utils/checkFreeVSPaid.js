function checkFreeVSPaid(domain, mxRecords = []) {
    const freeProviders = [
        "gmail.com", "yahoo.com", "outlook.com", "hotmail.com",
        "aol.com", "proton.me", "icloud.com", "rediffmail.com",
        "live.com", "yandex.com", "zoho.com"
    ];

    const paidPatterns = [
        { keyword: "amazonses.com", provider: "Amazon SES" },
        { keyword: "sendgrid.net", provider: "SendGrid" },
        { keyword: "mailgun.org", provider: "Mailgun" },
        { keyword: "googlemail.com", provider: "Google Workspace" },
        { keyword: "secureserver.net", provider: "GoDaddy" },
        { keyword: "messagingengine.com", provider: "FastMail" },
        { keyword: "zoho.in", provider: "Zoho Mail" },
        { keyword: "zoho.com", provider: "Zoho Mail" },
        { keyword: "outlook.com", provider: "Microsoft 365" }
    ];

    // 1️⃣ FREE PROVIDER CHECK
    if (freeProviders.includes(domain)) {
        return {
            isFreeProvider: true,
            isPaidProvider: false,
            provider: "Free Email Provider"
        };
    }

    // 2️⃣ PAID PROVIDER CHECK (USING MX)
    if (mxRecords.length > 0) {
        for (const mx of mxRecords) {
            for (const pattern of paidPatterns) {
                if (mx.exchange.includes(pattern.keyword)) {
                    return {
                        isFreeProvider: false,
                        isPaidProvider: true,
                        provider: pattern.provider
                    };
                }
            }
        }
    }

    // 3️⃣ DEFAULT → Mostly Paid Provider
    return {
        isFreeProvider: false,
        isPaidProvider: true,
        provider: "Custom Domain / Paid Provider"
    };
}

export default checkFreeVSPaid;
 

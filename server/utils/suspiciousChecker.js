function checkSuspiciousPattern(email) {
    const username = email.split("@")[0].toLowerCase();
    const result = {
        isSuspicious: false,
        suspiciousReason: ""
    };

    // 1. Too short username
    if (username.length <= 2) {
        return {
            isSuspicious: true,
            suspiciousReason: "username too short" 
        };
    }

    // 2. Only numbers
    if (/^\d+$/.test(username)) {
        return {
            isSuspicious: true,
            suspiciousReason: "only numbers"
        };
    }

    // 3. Repeated characters (aaa, 1111, jjjj)
    if (/(.)\1{2,}/.test(username)) {
        return {
            isSuspicious: true,
            suspiciousReason: "repeated characters"
        };
    }

    // 4. Too many numbers (more than 50%)
    const digits = username.replace(/\D/g, "").length;
    if (digits >= username.length / 2) {
        return {
            isSuspicious: true,
            suspiciousReason: "too numeric"
        };
    }

    // 5. Random keyboard/fake patterns
    const randomPatterns = ["qwerty", "asdf", "zxcv", "admin", "test","user","guest","temp","sample","foo","bar","mail","fake" ];
    if (randomPatterns.some(p => username.includes(p))) {
        return {
            isSuspicious: true,
            suspiciousReason: "common fake pattern"
        };
    }

    // 6. Double dots or underscores
    if (username.includes("..") || username.includes("__")) {
        return {
            isSuspicious: true,
            suspiciousReason: "double separators (.. or __)"
        };
    }

    // 7. Bot/auto names
    const botNames = ["noreply", "donotreply", "mailer", "automail"];
    if (botNames.includes(username)) {
        return {
            isSuspicious: true,
            suspiciousReason: "bot-like username"
        };
    }

    return result;
}

export default checkSuspiciousPattern;

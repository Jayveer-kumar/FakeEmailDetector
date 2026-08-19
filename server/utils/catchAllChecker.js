import dns from "dns";
dns.setDefaultResultOrder("ipv4first");
import net from "net";

// Domains that don't allow catch-all detection (always false)
const SKIPPED_PROVIDERS = [
    "gmail.com",
    "outlook.com",
    "hotmail.com",
    "yahoo.com",
    "live.com",
    "protonmail.com",
    "icloud.com"
];

function randomUser() {
    return Math.random().toString(36).slice(2, 10);
}

export default async function isCatchAll(domain) {
    // Skip providers where catch-all detection is useless
    if (SKIPPED_PROVIDERS.includes(domain)) {
        return false; // or return "unknown"
    }

    // Step 1: MX Records
    let mx;
    try {
        mx = await dns.promises.resolveMx(domain);
    } catch {
        return false;
    }

    if (!mx?.length) return false;

    // Use fastest MX (lowest priority)
    const mxHost = mx.sort((a, b) => a.priority - b.priority)[0].exchange;

    const testEmail = `${randomUser()}@${domain}`;

    return await new Promise(resolve => {
        let resolved = false;

        // Speed limit: 1500ms
        const timeout = setTimeout(() => {
            if (!resolved) {
                resolved = true;
                resolve(false);
            }
        }, 1500);

        const socket = net.createConnection(25, mxHost);

        socket.setEncoding("utf8");

        let step = 0;

        socket.on("data", msg => {
            msg = msg.toString();

            if (step === 0 && msg.startsWith("220")) {
                socket.write("HELO test.com\r\n");
                step = 1;
            }

            else if (step === 1 && msg.startsWith("250")) {
                socket.write("MAIL FROM:<check@test.com>\r\n");
                step = 2;
            }

            else if (step === 2 && msg.startsWith("250")) {
                socket.write(`RCPT TO:<${testEmail}>\r\n`);
                step = 3;
            }

            else if (step === 3) {
                socket.write("QUIT\r\n");
                socket.destroy();

                if (!resolved) {
                    resolved = true;
                    clearTimeout(timeout);
                    resolve(msg.startsWith("250")); // TRUE = catch-all
                }
            }
        });

        socket.on("error", () => {
            if (!resolved) {
                resolved = true;
                clearTimeout(timeout);
                resolve(false);
            }
        });
    });
}

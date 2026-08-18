// import dns from "dns";
// import net from "net";

// function randomEmailUser() {
//     return Math.random().toString(36).substring(2, 12);
// }

// export default async function isCatchAllDomain(domain) {
//     // 1. Get MX records
//     let mxRecords;
//     try {
//         mxRecords = await dns.promises.resolveMx(domain);
//     } catch (err) {
//         return false; // No MX = no catch-all
//     }

//     if (!mxRecords || mxRecords.length === 0) {
//         return false;
//     }

//     // Highest priority MX
//     const mxHost = mxRecords.sort((a, b) => a.priority - b.priority)[0].exchange;

//     const testEmail = `${randomEmailUser()}@${domain}`;

//     return await new Promise(resolve => {
//         const socket = net.createConnection(25, mxHost);

//         let stage = 0;

//         // Timeout safety
//         socket.setTimeout(5000, () => {
//             socket.destroy();
//             resolve(false);
//         });

//         socket.on("data", (data) => {
//             const msg = data.toString();

//             if (stage === 0 && msg.startsWith("220")) {
//                 socket.write("HELO test.com\r\n");
//                 stage++;
//             }
//             else if (stage === 1 && msg.startsWith("250")) {
//                 socket.write("MAIL FROM:<test@test.com>\r\n");
//                 stage++;
//             }
//             else if (stage === 2 && msg.startsWith("250")) {
//                 socket.write(`RCPT TO:<${testEmail}>\r\n`);
//                 stage++;
//             }
//             else if (stage === 3) {
//                 socket.write("QUIT\r\n");
//                 socket.destroy();

//                 if (msg.startsWith("250")) {
//                     // 250 OK → catch-all domain
//                     resolve(true);
//                 } else {
//                     resolve(false);
//                 }
//             }
//         });

//         socket.on("error", () => resolve(false));
//     });
// }



import dns from "dns";
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

import dns from "dns";

dns.setServers(["8.8.8.8", "1.1.1.1"]); // Safe

async function domainChecker(domain, timeout = 4000) {
  return new Promise((resolve) => {
    let done = false;

    const timer = setTimeout(() => {
      if (!done) {
        done = true;
        console.log(`⏱️ DNS timeout hit for ${domain} (after ${timeout}ms)`);
        resolve(false); // timeout = treat as invalid domain
      }
    }, timeout);

    dns.promises
      .resolveMx(domain)
      .then((mx) => {
        if (!done) {
          done = true;
          clearTimeout(timer);
          resolve(Array.isArray(mx) && mx.length > 0);
        }
      })
      .catch((err) => {
        console.error(
          `DNS MX lookup failed for ${domain}:`,
          err.code || err.message,
        ); // 👈 ye add karo
        if (!done) {
          done = true;
          clearTimeout(timer);
          resolve(false);
        }
      });
  });
}
export default domainChecker;

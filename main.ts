import { Serve } from "bun";

// Load .env file
Bun.env.NODE_ENV = Bun.env.NODE_ENV || "development";
await import(`${process.cwd()}/.env`);

const PORT = process.env.PORT || 3000;

const server: Serve = {
    port: PORT,
    fetch(req: Request, server) {
        try {
            let clientIP = this.requestIP(req); // using this instead of server as server is not yet initialized and thus does not work.
            if (clientIP.address.startsWith("::ffff:")) {
                clientIP = clientIP.address.substring(7);
            } else {
                clientIP = clientIP.address;
            }

            return new Response(clientIP);
        } catch (error) {
            return new Response(JSON.stringify({ error: "Internal Server Error" }), {
                status: 500,
                headers: { "Content-Type": "application/json" },
            });
        }
    },
};

Bun.serve(server);
console.log(`Server running at http://localhost:${server.port}`);

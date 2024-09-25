module.exports = {
    apps: [
        {
            name: "ip",
            script: "bun",
            args: "run start",
            env: {
                NODE_ENV: "production",
            },
        },
    ],
};
// git pull && npm run build && pm2 restart ip

const express = require('express')
const app = express()
const cors = require('cors')
const { botToken, serverId, portNumber, debugChannelId } = require('./environment')
const { client } = require('./client')
const { useGets } = require('./gets')
const { useLog } = require('./console')

app.use(
    express.json(),
    cors()
);

client.login(botToken).then(() => {
    useLog.success("logged into the bot.")
})

client.on('ready', () => {
    useLog.log(`logged to ${client.user.tag}`)
});

client.once('ready', async () => {
    const guild = client.guilds.cache.get("1173269460820430878");
    if (!guild) {
        useLog.error("server not found.")
        return;
    }

    app.get('/', async (req, res) => {
        // res.redirect("https://thundis.hideko.cf")
        res.send("Are you killing me?")
    })

    app.get('/api/:userId', async (req, res) => {
        const user = req.params.userId;
        await useGets(res, req, guild, user)
    })

    const server = app.listen(portNumber, () => {
        useLog.log(`server on port ${portNumber}`)
    })
    server.keepAliveTimeout = 120 * 1000
    server.headersTimeout = 120 * 1000;
})
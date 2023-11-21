const express = require('express')
const app = express()
const cors = require('cors')
const { botToken, serverId, portNumber, debugChannelId } = require('./environment')
const { client } = require('./client')
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
    const routes = require('./routes');
    app.use('/', routes)
    const server = app.listen(portNumber, () => {
        useLog.log(`server on port ${portNumber}`);
    });
    server.keepAliveTimeout = 120 * 1000;
    server.headersTimeout = 120 * 1000;
});
require('dotenv').config()

const botToken = process.env.BOT_TOKEN;
const serverId = process.env.SERVER_ID;
const portNumber = process.env.PORT_NUMBER;
const debugChannelId = process.env.DEBUG_CHANNEL_ID;

module.exports = {
    botToken,
    serverId,
    portNumber,
    debugChannelId
}
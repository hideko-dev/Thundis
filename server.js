const express = require('express');
const app = express();
const cors = require('cors')
const { botToken, serverId, portNumber, debugChannelId } = require('./environment');
const { client } = require('./client');

app.use(
    express.json(),
    cors()
);

client.login(botToken).then(() => {
    console.log("Bot has launched.")
})

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.once('ready', async () => {

    console.log(`Logged in as ${client.user.tag}`);

    const guild = client.guilds.cache.get("1173269460820430878");
    if (!guild) {
        console.log('Server not found');
        return;
    }

    app.get('/api/:userId', async (req, res) => {
        const userId = req.params.userId;

        try {
            const member = await guild.members.fetch(userId);
            if (member) {
                const pres = await member.presence;
                const user = pres.user;
                let activities;
                let conditions = {};
                if(pres.activities.length === 0){
                    activities = null
                } else {
                    activities = pres.activities;
                }
                if(pres.clientStatus){
                    const status = pres.clientStatus;
                    conditions = {
                        web: status.web === undefined ? "offline" : status.web,
                        desktop: status.desktop === undefined ? "offline" : status.desktop,
                        mobile: status.mobile === undefined ? "offline" : status.mobile,
                    }
                }
                res.status(200).json({
                    id: pres.userId,
                    status: pres.status,
                    tag: user.tag,
                    created_at: user.createdAt,
                    created_timestamp: user.createdTimestamp,
                    discriminator: user.discriminator,
                    bot: user.bot,
                    activities: activities,
                    public_flags: user.flags,
                    avatars: {
                        id: user.avatar,
                        url: user.avatarURL(),
                        default: user.defaultAvatarURL,
                    },
                    names: {
                        name: user.username,
                        global: user.globalName,
                        display: user.displayName,
                    },
                    banners: {
                        id: user.banner,
                        url: user.bannerURL(),
                    },
                    conditions: conditions,
                });
                const channel = client.channels.cache.get(debugChannelId);
                channel.send("~~------------------------------------------~~\n" + "**A new API has been acquired.**" + "\n" + "IP: " + req.ip + "\n~~------------------------------------------~~")
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    app.listen(portNumber, () => {
        console.log(`Started on port ${portNumber}`);
    });
});
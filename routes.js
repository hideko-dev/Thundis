const express = require('express')
const { serverId } = require('./environment')
const { useGets } = require('./gets')
const { client } = require('./client')
const {useLog} = require("./console")
const router = express.Router()
const guild = client.guilds.cache.get(serverId);
if (!guild) {
    useLog.error("server not found.")
    return
}

router.get('/', async (req, res) => {
    res.redirect('https://thundis.hideko.cf');
});

router.get('/id/:userId', async (req, res) => {
    const userTag = req.params.userId;
    if (!guild) {
        console.error('Guild is not defined.');
        res.status(500).send('Internal Server Error');
        return;
    }

    const user = await guild.members.fetch(userTag);
    await useGets(res, req, guild, user);
});

router.get('/tag/:userTag', async (req, res) => {
    const userTag = req.params.userTag;
    if (!guild) {
        console.error('Guild is not defined.');
        res.status(500).send('Internal Server Error');
        return;
    }

    const userinfo = client.users.cache.find((user) => user.tag === userTag);
    const user = await guild.members.fetch(userinfo.id);
    await useGets(res, req, guild, user);
});

module.exports = router;

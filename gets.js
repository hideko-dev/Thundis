const useGets = async (res, req, guild, user) => {
    try {
        const member = await guild.members.fetch(user)
        if (member) {
            const pres = await member.presence;
            const user = pres.user;
            let activities;
            let conditions = {};
            if (pres.activities.length === 0) {
                activities = null
            } else {
                activities = pres.activities;
            }
            if (pres.clientStatus) {
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
                api_status: "success"
            });
        } else {
            res.status(404).json({ error: 'User not found', api_status: "failed" });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', api_status: "failed" });
    }
}

module.exports = { useGets }
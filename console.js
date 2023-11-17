const { color } = require('console-log-colors')
// + color.gray("]")
const logs = {
    success: (
        color.bgGreen.greenBright(" Success ") +
        color.reset(" ")
    ),
    log: (
        color.bgMagenta.magentaBright(" Log ") +
        color.reset(" ")
    ),
    warning: (
        color.bgYellow.yellowBright(" Warning ") +
        color.reset(" ")
    ),
    error: (
        color.bgRed.redBright(" Error ") +
        color.reset(" ")
    ),
};

const useLog = {
    success: function(content) {
        console.log(logs.success + content);
    },
    log: function(content) {
        console.log(logs.log + content);
    },
    warning: function(content) {
        console.log(logs.warning + content);
    },
    error: function(content) {
        console.log(logs.error + content);
    }
};

module.exports = { useLog }
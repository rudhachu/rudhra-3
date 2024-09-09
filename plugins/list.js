const { Rudhra, mode, commands, PREFIX } = require("../lib");
const { OWNER_NAME, BOT_NAME } = require("../config");
const { hostname } = require("os");

Rudhra({
    pattern: 'list$',
    fromMe: mode,
    dontAddCommandList: true
}, async (message, match) => {
    let msg = '';
    let no = 1;
    for (const command of commands) {
        if (command.dontAddCommandList === false && command.pattern !== undefined) {
            msg += `${no++}. ${command.pattern.toString().match(/(\W*)([A-Za-z0-9_ğüşiö ç]*)/)[2].trim()}\n${command.desc}\n\n`;
        }
    }
    await message.reply(msg.trim());
});

Rudhra({
    pattern: 'help$',
    fromMe: mode,
    dontAddCommandList: true
}, async (message, match) => {
    if (match) {
      for (let i of commands) {
        if (
          i.pattern instanceof RegExp &&
          i.pattern.test(`${PREFIX}` + match)
        ) {
          const cmdName = i.pattern.toString().split(/\W+/)[1];
          message.reply(`\`\`\`Rudhra: ${PREFIX}${cmdName.trim()}
Description: ${i.desc}\`\`\``);
        }
      }
    } else {
      let { prefix } = message;
      let [date, time] = new Date()
        .toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
        .split(",");
      let menu = `╔═══❮ *${BOT_NAME}* ❯═══•
║╔═══════════════◉
║║ *User* : ${message.pushName}
║║ *Prefix* : ${PREFIX}
║║ *Server* : ${hostname().split("-")[0]}
║║ *Date* : ${date}
║║ *Time* : ${time}
║║ *Comments* : ${commands.length} 
║║
║║    █║▌║▌║║▌║ █
║║     ʀ   ᴜ   ᴅ   ʜ   ʀ   ᴀ
║╚═══════════════◉
╚═════════════════•\n`;
      let cmnd = [];
      let cmd;
      let category = [];
      commands.map((Rudhra, num) => {
        if (Rudhra.pattern instanceof RegExp) {
          cmd = Rudhra.pattern.toString().split(/\W+/)[1];
        }

        if (!Rudhra.dontAddCommandList && cmd !== undefined) {
          let type = Rudhra.type ? Rudhra.type.toLowerCase() : "misc";

          cmnd.push({ cmd, type });

          if (!category.includes(type)) category.push(type);
        }
      });
      cmnd.sort();
      category.sort().forEach((cmmd) => {
        menu += `╔╔══❮ *${cmmd.toUpperCase()}* ❯`;
        let comad = cmnd.filter(({ type }) => type == cmmd);
        comad.forEach(({ cmd }) => {
          menu += `\n║║  ${PREFIX} ${cmd.trim()} `;
        });
        menu += `\n`;
      });
        menu += `\n║║`;
      menu += `\n║╚═══════════⭓`;
      menu += `\n╚══════════════◉`;
      return await  message.send(menu, {
    contextInfo: {
externalAdReply: {
                    title: config.BOT_NAME,
                    body: config.OWNER_NAME,
                    sourceUrl: "https://github.com/princerudh/rudhra-md",
                    mediaUrl: "https://instagram.com",
                    mediaType: 1,
                    showAdAttribution: true,
                    renderLargerThumbnail: false,
                    thumbnailUrl: config.MENU_URL,
                }
    },
  });
    }
  }
);
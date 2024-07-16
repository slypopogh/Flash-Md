const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR09pMGQ1eWNjKzZVdDI4amlXNHNxNlFSRy9XNFZJaWZuank0SmczQTBGST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSTFuRXFEVlJiTGs0Wm1YdGp1T3RiTC96OGNlTEEvQUUxWkx3VDNQcmxtOD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrRzl5TE5nUTVYTnFvRDRlejFFS292ZDEzeFNsT1BHbEFqZENqcGsxSm1nPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJNM0dkU29HMW1iV0ZYMGVFV3FReXVRSXpxTWl2S2JFbjZQUUl0ZEFsU21rPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkFIUmxpcEU2bGx3TDFoVWZBSHg2ZVZMdk9TdUhMTlNKS2Zpckl6LzN5M0E9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjJUUmIvU0FMdHQ1Y3JDTFVMYjRSTVRJNUNPbVcyUm93NzNKNVFOVEFlQjA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMlBUQ1hEN0RyTDVhM1JKaHMrQlpmSUZ3Tk4zcExDTUVKZ3VRRUZ2eFcyMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUDNjdk5odzFCeU5oKzNLaXBWN0xFOE5RcFBrSmJadjIvdXBCYTVPTDBCWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik1vQlFYOXJpczhGNXlMakNsdFEwZ1JwcGZoUVh5TUlLWENtK0RqQlVIN0M5UzVRRERrSlluRTByM3JEclJ6OUJ5MHBaVC9HNWtKa3R0VlplQWVMZ0FRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTk0LCJhZHZTZWNyZXRLZXkiOiJKUElnSldPYXVSaGtmWG5Mc3FrQUlqQVlzZzJWdy96VFdUQzlhcjdOamVNPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJXMXdCOGVON1RzU29yS1QyN2c0SlRRIiwicGhvbmVJZCI6ImI0ZjAxMDFiLTgzOWUtNGI4OC04NDIwLWJlZDg3YjRlNDI5YiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIxM2toc3lFZjZDQWt4YTBBOU9LRW5EWjlkMmc9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNkgyMFlseWxlVUwzZ0FGZzhrT0JFNEd3dHNJPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6Ikw2WUI3WlYzIiwibWUiOnsiaWQiOiIyMzM1OTY3ODA2ODU6NzZAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiT2RzIFRlY2hub2xvZ2llcyJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTGpYN01JQkVQUHcxclFHR0VnZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiWjN1MXJ2WDBVUFdZQ1hheXhsNGtVYnRjaURwbG5VU1hyYmd3SlBjQ01pUT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiU1RwY3NLSlptbHhEUkRaVnN4VkVPWWlMcWU1Mmw3OTRZQitYMDlxbWVVaG1POVBXeWVqL1FLOXRpZWJwbTVzT1E4S2lObDJ0RlVoYzlmK04zV3hkRHc9PSIsImRldmljZVNpZ25hdHVyZSI6IlpFeXRxSENFUzNhK3ZMMHlIY0RFbE5sK014Ni9XelpST2RmY0dBQmtvZ2tHQ3NyZTQ4cVM3Q0Z5VlFDZnpPZkQ4MW9jUVVJb3BVaGVkVERFeS9iekFBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjMzNTk2NzgwNjg1Ojc2QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQldkN3RhNzE5RkQxbUFsMnNzWmVKRkc3WElnNlpaMUVsNjI0TUNUM0FqSWsifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjEwODgxMjh9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "ODS TECHNOLOGIES",
    OWNER_NUMBER : process.env.OWNER_NUMBER || "233596780685", 
             
    AUTO_VIEW_STATUS: process.env.AUTO_VIEW_STATUS || "off",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_SAVE_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    BOT : process.env.BOT_NAME || 'ODS TECHNOLOGIES',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.BOT_MODE || "public",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    PRESENCE : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_MESSAGE || "off",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'off',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

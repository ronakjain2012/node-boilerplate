import TelegramBot from 'node-telegram-bot-api';
import config from '@/config';
import logger from '@/logger';

let BOT;

function connect() {
  if (!BOT) {
    let TOKEN = config.telegram.botToken;
    if (config.telegram.serviceFlag) BOT = new TelegramBot(TOKEN, { polling: false });
  }
}

export function sendToTelegram(message, tags = '#update', chatId = config.telegram.defaultUpdateChatId) {
  if (config.telegram.serviceFlag) {
    connect();
    tags = tags ? `\n\n${tags}` : '';
    let newMessage = `${message}${tags}`;
    BOT.sendMessage(chatId, newMessage).catch((error) => {
      logger.error(error.code); // => 'ETELEGRAM'
      logger.error(error.response.body); // => { ok: false, error_code: 400, description: 'Bad Request: chat not found' }
    });
  }
}

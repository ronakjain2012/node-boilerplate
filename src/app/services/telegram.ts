import TelegramBot from 'node-telegram-bot-api';
import config from '@/config';
import logger from '@/logger';
import { toString } from '@/helper';

let BOT;

function connect() {
  if (!BOT) {
    let TOKEN = config.telegram.botToken;
    if (config.telegram.serviceFlag) BOT = new TelegramBot(TOKEN, { polling: false });
  }
}

export function sendToTelegram(message, tags = '#update', chatId = config.telegram.defaultUpdateChatId) {
  if (config.telegram.serviceFlag) {
    try {
      connect();
      let pMode = 'Markdown';
      if (!['number', 'string'].includes(typeof message)) {
        if (message.error) {
          message.error = message.error.replace(/\n/g, '');
        }
        message = '```\n' + toString(message, 2).replace(/<(.|\n)*?>/) + '\n```';
      } else {
        // pMode = 'HTML';
      }
      tags = tags ? `\n${tags}` : '';
      let newMessage = `${message}${tags}`;
      console.log(newMessage);
      BOT.sendMessage(chatId, newMessage, { parse_mode: pMode }).catch((error) => {
        logger.error(error.code); // => 'ETELEGRAM'
        logger.error(error.response.body); // => { ok: false, error_code: 400, description: 'Bad Request: chat not found' }
      });
    } catch (error) {
      logger.error('sendToTelegram', error.message);
    }
  }
}

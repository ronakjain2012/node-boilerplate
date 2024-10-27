import EventEmitter from 'events';
import { sendToZulip } from './zulip';
import { toString } from '@/helper';
import { sendToTelegram } from './telegram';
import logger from './logger';

const evnts = new EventEmitter();

evnts.on('elt', (data) => {
  sendToZulip(
    `\`\`\`json
${toString(data.data, 2)}
\`\`\``,
    '#error',
    data.topic,
  );
  sendToTelegram(data.data, '#error');
  logger.info(data);
});

evnts.on('al', (data) => {
  logger.info(data);
});

export default evnts;

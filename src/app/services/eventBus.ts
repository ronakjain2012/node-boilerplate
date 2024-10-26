import EventEmitter from 'events';
import { sendToZulip } from './zulip';
import { toString } from '@/helper';
import { sendToTelegram } from './telegram';

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
});

evnts.on('al', (data) => {
  console.log(data);
});

export default evnts;

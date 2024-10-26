import EventEmitter from 'events';
import { sendToZulip } from './zulip';
import { toString } from '@/helper';

const evnts = new EventEmitter();

evnts.on('elt', (data) => {
  sendToZulip(
    `\`\`\`json
${toString(data.data, 2)}
\`\`\``,
    '#error',
    data.topic,
  );
});

evnts.on('al', (data) => {
  console.log(data);
});

export default evnts;

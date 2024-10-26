import config from '@/config';
import axiosFace from './axiosFace';
import { axiosErrorLogger } from '@/helper';

export async function sendToZulip(message, tags = '#update', topic = '#update', chatId = config.zulip.defaultUpdateChatId) {
  if (config.zulip.serviceFlag) {
    tags = tags ? `\n\n${tags}` : '';
    let newMessage = `${message}${tags}`;
    axiosFace
      .post(
        config.zulip.url,
        new URLSearchParams({
          type: 'stream', //gave the values directly for testing
          to: `[${chatId}]`,
          topic: topic,
          content: newMessage,
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic '+Buffer.from(`${config.zulip.botTokenUsername}:${config.zulip.botTokenPassword}`).toString('base64')
          },
        },
      )
      .catch((error) => {
        axiosErrorLogger(error)
      });
  }
}

import evnts from './eventBus';

export const errorLog = (topic, message, data) => {
  evnts.emit('elt', { topic, message, data });
};

export const activityLog = (
  user,
  {
    eventId = null,
    eventName = null,
    tag = null,
    message = null,
    type = 'info',
    dateTime = +new Date(),
    identifier1 = null,
    value1 = null,
    identifier2 = null,
    value2 = null,
    identifier3 = null,
    value3 = null,
    extraMeta = {},
  },
) => {
  evnts.emit('al', {
    ...user,
    eventId,
    eventName,
    tag,
    message,
    type,
    dateTime,
    identifier1,
    value1,
    identifier2,
    value2,
    identifier3,
    value3,
    extraMeta,
  });
};

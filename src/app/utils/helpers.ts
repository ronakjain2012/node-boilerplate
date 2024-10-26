import dayjs from 'dayjs';
import fs from 'fs';
import config from '@/config';
import crypto from 'crypto';
import logger from '@/logger';

export const getNow = (format = config.detetime.default) => dayjs().format(format);

export const getRandomFloat = (min, max) => Math.random() * (max - min) + min;

export const randomNumber = (length = 10) => {
  let text = '';
  const possible = '123456789';
  for (let i = 0; i < length; i++) {
    const sup = Math.floor(Math.random() * possible.length);
    text += i > 0 && sup === i ? '0' : possible.charAt(sup);
  }
  return Number(text);
};

export const getRandomID = () => crypto.randomUUID();

export const jsonToCsvBooks = (filename) => {
  const data = fs.readFileSync(filename, 'utf8');
  const json = JSON.parse(data).books;
  const replacer = (key, value) => (value === null ? '' : value); // specify how you want to handle null values here
  const header = Object.keys(json[0]);
  let csv = json.map((row) => header.map((fieldName) => JSON.stringify(row[fieldName], replacer)).join(','));
  csv.unshift(header.join(','));
  csv = csv.join('\r\n');
  fs.writeFileSync(`storage/files/${filename}.csv`, csv);
  return csv;
};

export const toString = (data, format = 0) => {
  if (data === null) {
    return null;
  } else if (['number', 'string', 'boolean'].includes(typeof data)) {
    return data;
  } else {
    return JSON.stringify(data, null, format);
  }
};

export const toJSON = (data) => {
  if (data === null || data === undefined) {
    return data;
  } else if (['number', 'string', 'boolean'].includes(typeof data)) {
    return data;
  } else {
    return JSON.parse(data);
  }
};

export const axiosErrorLogger = (error) => {
  logger.error('AxiosRequest error',{
    code: error.code,
    message: error.message,
    response: error.response ? error.response.data : 'No Response',
    config: error.config ? error.config : 'No Config',
  });
  if (error.code === 'ECONNABORTED') {
    logger.error('Request timed out');
  }
};

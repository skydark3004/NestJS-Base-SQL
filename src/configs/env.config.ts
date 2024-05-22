import * as path from 'path';
import * as dotenv from 'dotenv';
const ROOT = path.normalize(__dirname + '/../..');
dotenv.config({ path: `${ROOT}/.env` });

const envConfig = {
  NODE_ENV: process.env.NODE_ENV || 'local',
  VERSION: process.env.VERSION || 'v1',
  NAME: process.env.NAME || 'localhost',
  LOGGING_QUERY_SQL: process.env.LOGGING_QUERY_SQL === 'true' ? JSON.parse(process.env.LOGGING_QUERY_SQL) : false, // log query
  APP: {
    PORT: process.env.APP_PORT ? Number(process.env.APP_PORT) : 9999,
    NAME: process.env.APP_NAME || '',
  },
  DATABASE: {
    POSTGRESQL: {
      USERNAME: process.env.POSTGRESQL_USERNAME || 'postgres',
      PASSWORD: process.env.POSTGRESQL_PASSWORD || 'postgres',
      HOST: process.env.POSTGRESQL_HOST || 'localhost',
      PORT: Number(process.env.POSTGRESQL_PORT) || 5432,
      NAME: process.env.POSTGRESQL_NAME || 'tru-mate-local',
    },
  },
  SECURE: {
    JWT: {
      SECRET_KEY: process.env.SECURE_JWT_SECRET_KEY || `core-devjwtauthenticate-core.dev_professional#2023`,
      TOKEN_EXPIRE: process.env.SECURE_JWT_TOKEN_EXPIRE ? Number(process.env.SECURE_JWT_TOKEN_EXPIRE) : 24 * 60 * 60 * 30, // 30 days
    },
    SECRET_KEY: process.env.SECURE_SECRET_KEY || `f54cbce96307efc3367641177acc7cf8`,
    SECRET_KEY_CLIENT: process.env.SECURE_SECRET_KEY_CLIENT,
    SECRET_KEY_CLIENT_IDS: process.env.SECURE_SECRET_CLIENT_IDS || 'f54cbce96307efc52353k45435n2k34423j4324hkl4234n324',
  },
  STORAGE: {
    DOMAIN: process.env.STORAGE_MEDIA_DOMAIN || '', //  http://localhost:9999/_data
    ROOT: path.join(__dirname, '../../', '_data/upload/storage'),
  },
  MAIL_CONFIG: {
    ON_PREMISE: {
      SMTP_CONFIG: {
        service: process.env.MAIL_CONFIG_SMTP_SERVICE || '',
        host: process.env.MAIL_CONFIG_SMTP_HOST || '',
        port: Number(process.env.MAIL_CONFIG_SMTP_PORT) || 587,
        auth: {
          user: process.env.MAIL_CONFIG_SMTP_USER || '',
          pass: process.env.MAIL_CONFIG_SMTP_PASS || '',
        },
      },
      WEB_URL: process.env.MAIL_CONFIG_SMTP_WEB_URL || '',
    },
    GMAIL: {
      CONFIG: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 587, false for other ports
        requireTLS: true,
        auth: {
          user: process.env.MAIL_CONFIG_GMAIL_USER || '',
          pass: process.env.MAIL_CONFIG_GMAIL_PASSWORD || '',
        },
      },
    },
    FROM: process.env.MAIL_CONFIG_GMAIL_FROM || '',
  },
  LOG_FOLDER: {
    ROOT: path.join(__dirname, '../../../', '_data/logs'),
  },
  OWNER_EMAIL: process.env.OWNER_EMAIL || 'thangnl@egdgroup.com',
};

export default envConfig;

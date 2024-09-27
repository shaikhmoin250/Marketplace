import dotnenv from 'dotenv';

dotnenv.config();

const config = {
  PORT: process.env.PORT || 3100,
  MONGODB_URI: process.env.MONGODB_URI || '',
  JWT_SECRET: process.env.JWT_SECRET || '',
};

export default config;

import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    environment: process.env.NODE_ENV || 'development',
    port: process.env.APP_PORT || 3000,
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    accessTokenExpires: process.env.ACCESS_TOKEN_EXPIRES,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
    refreshTokenExpires: process.env.REFRESH_TOKEN_EXPIRES,
  };
});

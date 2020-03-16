import common from './configs/common';
import development from './configs/development';
import production from './configs/production';
import staging from './configs/staging';
import test from './configs/test';

const configs = {
  development,
  staging,
  production,
  test,
};

type EnvType = keyof typeof configs;

const env: EnvType = process.env.NODE_ENV || 'development';

const envConfig = configs[env];

export const CONFIG = { ...common, ...envConfig };

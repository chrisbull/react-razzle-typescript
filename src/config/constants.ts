import { CONFIG } from './config';

export const isDev = !!CONFIG.devMode;
export const isProd = !isDev;

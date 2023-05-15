import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

const environments = dotenv.config();
dotenvExpand.expand(environments);

export const JWT_SECRET: string = process.env.JWT_SECRET || '';
export const SALT_OR_ROUNDS: string = process.env.SALT_OR_ROUNDS || '10';

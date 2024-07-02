import 'dotenv/config';
import * as z from 'zod';

const configSchema = z
  .object({
    PORT: z.preprocess(Number, z.number()).default(8080).readonly(),
    NODE_ENV: z
      .enum(['DEVELOPMENT', 'PRODUCTION', 'STAGING'])
      .default('DEVELOPMENT')
      .readonly(),
    ALLOWED_ORIGINS: z.string().default('*'),
  })
  .readonly();

export type TConfig = z.infer<typeof configSchema>;

export const config = configSchema.parse(process.env);

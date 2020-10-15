import * as dotenv from 'dotenv-safe';

dotenv.config();

const {
  KAFKA_URL,
} = process.env;

export {
  KAFKA_URL,
}

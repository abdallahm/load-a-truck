import dotenv from 'dotenv';

export default async () => {
  dotenv.config({ path: `./.env.${process.env.NODE_ENV}` })
}

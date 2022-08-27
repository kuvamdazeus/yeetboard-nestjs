import { createClient, RedisClientType } from 'redis';

let client: RedisClientType;

export default async function getClient() {
  if (client && client.isOpen) return client;
  client = createClient({ url: process.env.REDIS_URL });

  console.log('CONNECTING to redis');
  await client.connect();
  console.log('CONNECTED to redis');
  return client;
}

import mysql, { RowDataPacket } from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

function getRequiredEnvironmentVariable(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required database environment variable: ${name}`);
  }

  return value;
}

export async function queryDatabase(
  query: string,
  params: unknown[] = []
): Promise<RowDataPacket[]> {
  const connection = await mysql.createConnection({
    host: getRequiredEnvironmentVariable('DB_HOST'),
    port: Number(getRequiredEnvironmentVariable('DB_PORT')),
    user: getRequiredEnvironmentVariable('DB_USER'),
    password: getRequiredEnvironmentVariable('DB_PASSWORD'),
    database: getRequiredEnvironmentVariable('DB_NAME')
  });

  try {
    const [rows] = await connection.execute<RowDataPacket[]>(query, params as any[]);
    return rows;
  } finally {
    await connection.end();
  }
}

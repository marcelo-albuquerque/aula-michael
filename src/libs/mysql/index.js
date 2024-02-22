import { createConnection } from 'mysql2/promise';

export default async function MySQL( query ) {
  const connection = await createConnection({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  });

  const [ rows ] = await connection.execute( query );

  await connection.end();

  return rows;
}
import * as mysql from 'mysql2/promise'; // Ensure correct import
import * as dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const initDatabase = async () => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
        });

        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
        console.log(`Database ${process.env.DB_NAME} is ready.`);
        await connection.end();
    } catch (error) {
        console.error('Error initializing database:', error);
    }
};

initDatabase();

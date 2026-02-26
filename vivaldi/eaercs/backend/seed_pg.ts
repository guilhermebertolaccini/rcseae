import 'dotenv/config';
import { Client } from 'pg';
import { hash, argon2id } from 'argon2';

async function generate() {
    const pepper = process.env.PASSWORD_PEPPER || 'development-pepper-string';
    const h = await hash('admin123' + pepper, {
        type: argon2id,
        memoryCost: 65536,
        timeCost: 3,
        parallelism: 4,
    });

    const client = new Client({
        connectionString: process.env.DATABASE_URL
    });

    await client.connect();

    // Use "User" because Prisma quotes model names
    await client.query(
        `INSERT INTO "User" (username, password, "updatedAt") VALUES ('admin', $1, NOW()) ON CONFLICT (username) DO NOTHING;`,
        [h]
    );

    console.log('Admin user seeded via PG driver.');
    await client.end();
}

generate().catch(console.error);

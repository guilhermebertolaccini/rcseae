import { hash, argon2id } from 'argon2';

async function generate() {
    const pepper = process.env.PASSWORD_PEPPER || 'development-pepper-string';
    const h = await hash('admin123' + pepper, {
        type: argon2id,
        memoryCost: 65536,
        timeCost: 3,
        parallelism: 4,
    });
    console.log(h);
}
generate();

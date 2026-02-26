import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import * as argon2 from 'argon2';

@Injectable()
export class HashingService {
    private pepper: string;

    constructor() {
        this.pepper = process.env.PASSWORD_PEPPER || 'development-pepper-string';
    }

    async hash(password: string): Promise<string> {
        // Generate a secure random salt (Argon2id uses 16 bytes by default, we'll explicitly pass one if needed, but argon2 library handles salt generation securely)
        // We append the pepper to the password before hashing
        const passwordWithPepper = password + this.pepper;

        // argon2 automatically creates and embeds the salt in the resulting hash string
        return argon2.hash(passwordWithPepper, {
            type: argon2.argon2id,
            memoryCost: 65536, // 64 MB
            timeCost: 3,
            parallelism: 4,
        });
    }

    async verify(hash: string, password: string): Promise<boolean> {
        const passwordWithPepper = password + this.pepper;
        try {
            return await argon2.verify(hash, passwordWithPepper);
        } catch (e) {
            return false;
        }
    }
}

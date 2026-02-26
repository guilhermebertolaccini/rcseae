import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { HashingService } from './hashing.service';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private hashingService: HashingService,
    ) { }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        if (!user) {
            return null;
        }
        const isPasswordValid = await this.hashingService.verify(user.password, pass);
        if (isPasswordValid) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                username: user.username,
            }
        };
    }

    async register(username: string, pass: string) {
        const existing = await this.usersService.findOne(username);
        if (existing) {
            throw new UnauthorizedException('User already exists');
        }
        const hashedPassword = await this.hashingService.hash(pass);
        const user = await this.usersService.create({ username, password: hashedPassword });
        const { password, ...result } = user;
        return result;
    }
}

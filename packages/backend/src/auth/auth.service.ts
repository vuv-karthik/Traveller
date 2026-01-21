import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    async login(loginDto: LoginDto) {
        // Mock implementation - accepts any email/password
        console.log('🔐 Login attempt:', loginDto.email);

        return {
            accessToken: 'mock_access_token_' + Date.now(),
            refreshToken: 'mock_refresh_token_' + Date.now(),
            user: {
                id: '123e4567-e89b-12d3-a456-426614174000',
                email: loginDto.email,
                name: 'Test User',
            }
        };
    }

    async getMe() {
        return {
            id: '123e4567-e89b-12d3-a456-426614174000',
            email: 'test@example.com',
            name: 'Test User',
        };
    }
}

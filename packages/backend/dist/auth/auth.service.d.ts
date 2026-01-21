import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    login(loginDto: LoginDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            email: string;
            name: string;
        };
    }>;
    getMe(): Promise<{
        id: string;
        email: string;
        name: string;
    }>;
}

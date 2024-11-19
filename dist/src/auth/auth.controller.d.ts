import { AuthService } from './auth.service';
import { SignupDto } from './dtos/signup.dto';
import { LoginDto } from './dtos/login.dto';
import { RefreshTokenDto } from './dtos/refresh-tokens.dto';
import { ChangePasswordDto } from './dtos/change-password.dto';
import { ForgotPasswordDto } from './dtos/forgot-password.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signUp(signupData: SignupDto): Promise<void>;
    login(credentials: LoginDto): Promise<{
        userId: unknown;
        accessToken: string;
        refreshToken: any;
    }>;
    refreshTokens(refreshTokenDto: RefreshTokenDto): Promise<{
        accessToken: string;
        refreshToken: any;
    }>;
    changePassword(changePasswordDto: ChangePasswordDto, req: any): Promise<void>;
    forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<{
        message: string;
    }>;
    resetPassword(resetToken: string): Promise<{
        message: string;
    }>;
}

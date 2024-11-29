/// <reference types="multer" />
import { AuthService } from './auth.service';
import { SignupDto } from './dtos/signup.dto';
import { LoginDto } from './dtos/login.dto';
import { RefreshTokenDto } from './dtos/refresh-tokens.dto';
import { ChangePasswordDto } from './dtos/change-password.dto';
import { ForgotPasswordDto } from './dtos/forgot-password.dto';
import { UpdateProfileDto } from './dtos/update-profil.dto';
import { User } from './schemas/user.schema';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
    editProfile(updateProfileDto: UpdateProfileDto, req: any): Promise<User & Required<{
        _id: unknown;
    }>>;
    signupWithImage(signupDto: SignupDto, file: Express.Multer.File): Promise<{
        message: string;
        user: {
            id: unknown;
            name: string;
            email: string;
            profilePicture: string;
        };
    }>;
    getUserProfile(req: any): Promise<{
        name: string;
        email: string;
        profilePictureUrl: string;
    }>;
}

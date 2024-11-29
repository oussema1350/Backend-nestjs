/// <reference types="mongoose/types/models" />
import { SignupDto } from './dtos/signup.dto';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { LoginDto } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from './schemas/refresh-token.schema';
import { ResetToken } from './schemas/reset-token.schema';
import { MailService } from 'src/services/mail.service';
import { RolesService } from 'src/roles/roles.service';
import { UpdateProfileDto } from './dtos/update-profil.dto';
export declare class AuthService {
    private UserModel;
    private RefreshTokenModel;
    private ResetTokenModel;
    private jwtService;
    private mailService;
    private rolesService;
    private readonly logger;
    constructor(UserModel: Model<User>, RefreshTokenModel: Model<RefreshToken>, ResetTokenModel: Model<ResetToken>, jwtService: JwtService, mailService: MailService, rolesService: RolesService);
    signup(signupData: SignupDto, profilePicturePath?: string): Promise<{
        message: string;
        user: {
            id: unknown;
            name: string;
            email: string;
            profilePicture: string;
        };
    }>;
    getUserProfile(userId: string): Promise<{
        name: string;
        email: string;
        profilePictureUrl: string;
    }>;
    login(credentials: LoginDto): Promise<{
        userId: unknown;
        accessToken: string;
        refreshToken: any;
    }>;
    refreshTokens(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: any;
    }>;
    generateUserTokens(userId: any): Promise<{
        accessToken: string;
        refreshToken: any;
    }>;
    storeRefreshToken(token: string, userId: string): Promise<void>;
    changePassword(userId: any, oldPassword: string, newPassword: string): Promise<void>;
    forgotPassword(email: string): Promise<{
        message: string;
    }>;
    private generateRandomPassword;
    resetPassword(resetToken: string): Promise<{
        message: string;
    }>;
    getUserPermissions(userId: string): Promise<{
        resource: import("../roles/enums/resource.enum").Resource;
        actions: import("../roles/enums/action.enum").Action[];
    }[]>;
    updateProfile(userId: string, updateProfileDto: UpdateProfileDto): Promise<User & Required<{
        _id: unknown;
    }>>;
}

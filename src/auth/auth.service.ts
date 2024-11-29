import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignupDto } from './dtos/signup.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import mongoose, { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from './schemas/refresh-token.schema';
import { v4 as uuidv4 } from 'uuid';
import { nanoid } from 'nanoid';
import { ResetToken } from './schemas/reset-token.schema';
import { MailService } from 'src/services/mail.service';
import { RolesService } from 'src/roles/roles.service';
import * as crypto from 'crypto';
import { UpdateProfileDto } from './dtos/update-profil.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    @InjectModel(User.name) private UserModel: Model<User>,
    @InjectModel(RefreshToken.name)
    private RefreshTokenModel: Model<RefreshToken>,
    @InjectModel(ResetToken.name)
    private ResetTokenModel: Model<ResetToken>,
    private jwtService: JwtService,
    private mailService: MailService,
    private rolesService: RolesService,
  ) {}


 /* async signup(signupData: SignupDto) {
    const { email, password, name} = signupData;

    //Check if email is in use
    const emailInUse = await this.UserModel.findOne({
      email,
    });
    if (emailInUse) {
      throw new BadRequestException('Email already in use');
    }
    //Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user document and save in mongodb
    await this.UserModel.create({
      name, 
      email,
      password: hashedPassword,
    });
  }*/
  async signup(signupData: SignupDto, profilePicturePath?: string) {
    const { email, password, name } = signupData;
  
    // Check if email is already in use
    const emailInUse = await this.UserModel.findOne({ email });
    if (emailInUse) {
      throw new BadRequestException('Email already in use');
    }
  
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
  
    // Create user document with optional profile picture
    const user = new this.UserModel({
      name,
      email,
      password: hashedPassword,
      profilePicture: profilePicturePath || null, // Use the provided path or set to null
    });
  
    await user.save();
  
    return {
      message: 'User created successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture,
      },
    };
  }

  async getUserProfile(userId: string) {
    const user = await this.UserModel.findById(userId).select('-password');
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return {
      name: user.name,
      email: user.email,
      profilePictureUrl: user.profilePicture ? `${process.env.API_URL}/${user.profilePicture}` : null
    };
  }
    
    
  async login(credentials: LoginDto) {
    const { email, password } = credentials;
    //Find if user exists by email
    const user = await this.UserModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Wrong credentials');
    }

    //Compare entered password with existing password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Wrong credentials');
    }

    //Generate JWT tokens
    const tokens = await this.generateUserTokens(user._id);
    return {
      ...tokens,
      userId: user._id,
    };
  }
  async refreshTokens(refreshToken: string) {
    const token = await this.RefreshTokenModel.findOne({
      token: refreshToken,
      expiryDate: { $gte: new Date() },
    });

    if (!token) {
      throw new UnauthorizedException('Refresh Token is invalid');
    }
    return this.generateUserTokens(token.userId);
  }

  async generateUserTokens(userId) {
    const accessToken = this.jwtService.sign({ userId }, { expiresIn: '10h' });
    const refreshToken = uuidv4();

    await this.storeRefreshToken(refreshToken, userId);
    return {
      accessToken,
      refreshToken,
    };
  }

  async storeRefreshToken(token: string, userId: string) {
    // Calculate expiry date 3 days from now
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 3);

    await this.RefreshTokenModel.updateOne(
      { userId },
      { $set: { expiryDate, token } },
      {
        upsert: true,
      },
    );
  }

  async changePassword(userId, oldPassword: string, newPassword: string) {
    //Find the user
    const user = await this.UserModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found...');
    }

    //Compare the old password with the password in DB
    const passwordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Wrong credentials');
    }

    //Change user's password
    const newHashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = newHashedPassword;
    await user.save();
  }

  async forgotPassword(email: string) {
    // Vérifier si l'utilisateur existe
    const user = await this.UserModel.findOne({ email });
  
    if (user) {
      // Si l'utilisateur existe, générer un mot de passe temporaire
      const newPassword = this.generateRandomPassword(12);  // Vous pouvez ajuster la longueur ici
      user.password = await bcrypt.hash(newPassword, 12);  // Changer le mot de passe de l'utilisateur
      await user.save();
  
      // Envoyer le nouveau mot de passe par email
      await this.mailService.sendPasswordResetEmail(email, newPassword);
    }
  
    return { message: 'Si cet utilisateur existe, il recevra un nouvel email avec son mot de passe.' };
  }
  
  private generateRandomPassword(length: number = 12): string {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    let password = '';
    const randomBytes = crypto.randomBytes(length);
  
    for (let i = 0; i < length; i++) {
      password += charset[randomBytes[i] % charset.length];
    }
  
    // Limiter la longueur du mot de passe généré
    return password.slice(0, length);  // Cela garantit que la longueur du mot de passe est exactement ce que vous voulez
  }
  

  async resetPassword(resetToken: string) {
    this.logger.debug('Reset password function called');
    
    try {
      const token = await this.ResetTokenModel.findOneAndDelete({
        token: resetToken,
        expiryDate: { $gte: new Date() },
      });

      if (!token) {
        this.logger.warn(`Invalid or expired reset token: ${resetToken}`);
        throw new UnauthorizedException('Invalid or expired reset link');
      }

      const user = await this.UserModel.findById(token.userId);
      if (!user) {
        this.logger.error(`User not found for token: ${resetToken}`);
        throw new InternalServerErrorException('User not found');
      }

      const newPassword = this.generateRandomPassword(12);
      this.logger.debug(`Generated new password for user: ${user.email}`);

      user.password = await bcrypt.hash(newPassword, 12);
      await user.save();
      this.logger.debug(`New password saved for user: ${user.email}`);

      await this.mailService.sendPasswordResetEmail(user.email, newPassword);
      this.logger.debug(`Password reset email sent to: ${user.email}`);

      return { message: 'A new password has been sent to your email address.' };
    } catch (error) {
      this.logger.error(`Error in resetPassword: ${error.message}`, error.stack);
      throw error;
    }
  }
  

  async getUserPermissions(userId: string) {
    const user = await this.UserModel.findById(userId);

    if (!user) throw new BadRequestException();

    const role = await this.rolesService.getRoleById(user.roleId.toString());
    return role.permissions;
  }
  async updateProfile(userId: string, updateProfileDto: UpdateProfileDto) {
    const { name, oldPassword, newPassword } = updateProfileDto;
  
    // Fetch the user from the database
    const user = await this.UserModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
  
    // Update the name if provided
    if (name) {
      user.name = name;
      await user.save();
    }
  
    // Update the password if both old and new passwords are provided
    if (oldPassword && newPassword) {
      await this.changePassword(userId, oldPassword, newPassword);
    }
  
    // Return the updated user (excluding sensitive information like the password)
    return user.toObject({ versionKey: false, transform: (_, ret) => { delete ret.password; } });
  }
  
  
}

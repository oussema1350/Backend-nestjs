import { BadRequestException, Body, Controller, Get, Logger, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dtos/signup.dto';
import { LoginDto } from './dtos/login.dto';
import { RefreshTokenDto } from './dtos/refresh-tokens.dto';
import { ChangePasswordDto } from './dtos/change-password.dto';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { ForgotPasswordDto } from './dtos/forgot-password.dto';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { UpdateProfileDto } from './dtos/update-profil.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from './schemas/user.schema';
import { Observable, of } from 'rxjs';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path = require('path');


@ApiTags('Authentication') // Groupe cette API sous "Authentication"

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /*@Post('signup')
  async signUp(@Body() signupData: SignupDto) {
    return this.authService.signup(signupData);
  }*/

  @Post('login')
  async login(@Body() credentials: LoginDto) {
    return this.authService.login(credentials);
  }

  @Post('refresh')
  async refreshTokens(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshTokens(refreshTokenDto.refreshToken);
  }

  @ApiBearerAuth() // Exige un Bearer Token pour cette méthode
  @UseGuards(AuthenticationGuard)
  @Put('change-password')
  @ApiBody({
    description: 'Change user password',
    type: ChangePasswordDto,
  })
  async changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @Req() req,
  ) {
    return this.authService.changePassword(
      req.userId,
      changePasswordDto.oldPassword,
      changePasswordDto.newPassword,
    );
  }

  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto.email);
  }

  @Put('reset-password')
async resetPassword(@Body('resetToken') resetToken: string) {
  try {
    const result = await this.authService.resetPassword(resetToken);
    Logger.debug(`Password reset successful for token: ${resetToken}`);  // Ajouté pour vérification
    return result;
  } catch (error) {
    Logger.error(`Error in resetPassword controller: ${error.message}`);  // Ajouté pour capturer les erreurs
    throw error;
  }
}
@ApiBearerAuth() // Require authentication
@UseGuards(AuthenticationGuard)
@Put('edit-profile')
@ApiBody({
  description: 'Edit user profile (name or password)',
  type: UpdateProfileDto,
})
async editProfile(
  @Body() updateProfileDto: UpdateProfileDto,
  @Req() req, // Extract userId from the authenticated request
) {
  return this.authService.updateProfile(req.userId, updateProfileDto);
}

@Post('signup')
  @UseInterceptors(
    FileInterceptor('profilePicture', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
          cb(null, uniqueName);
        },
      }),
      fileFilter: (req, file, cb) => {
       console.log(`Received file: ${JSON.stringify(file)}`);
        if (!file) {
          return cb(null, true);
        }
        // Accept more image MIME types
        if (!file.mimetype.match(/^image\/(jpg|jpeg|png|gif|webp|bmp|tiff)$/i)) {
          return cb(new BadRequestException('Only image files are allowed!'), false);
        }
        cb(null, true);
      },
    }),
  )
  async signupWithImage(
    @Body() signupDto: SignupDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    let imagePath = null;
    if (file) {
      imagePath = `uploads/${file.filename}`;
      console.log(`File saved: ${imagePath}`);
    }
    return this.authService.signup(signupDto, imagePath);
  }

  @UseGuards(AuthenticationGuard)
  @Get('profile')
  async getUserProfile(@Req() req) {
    return this.authService.getUserProfile(req.user.userId);
  }

}

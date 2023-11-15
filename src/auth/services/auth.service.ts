import { Injectable, UnauthorizedException, BadRequestException, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import * as PasswordValidator from 'password-validator';
import { ConfigService } from '@nestjs/config';
import { getMilliseconds } from '../../common/utils/date.util';
import { UserRepository } from '../repositories/user.repository';
import { Errors } from '../../common/entities/errors';
@Injectable()
export class AuthService {
  SALT_ROUNDS = 12;
  private passwordValidator: PasswordValidator;
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {
    this.passwordValidator = new PasswordValidator()
      .min(9, Errors.PASSWORD_MUST_HAVE_NINE_CHAR)
      .max(100)
      .lowercase(null, Errors.PASSWORD_MUST_HAVE_LOWERCASE)
      .digits(1, Errors.PASSWORD_MUST_HAVE_NUMBER)
      .not()
      .spaces()
      .is()
      .not()
      .oneOf(['Passw0rd', 'Password123'], Errors.PASSWORD_INVALID);
  }

  async login(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({ email });
    if (user) {
      const isSamePassword = await bcrypt.compare(password, user.passwordEncrypted);
      if (!isSamePassword) {
        throw new UnauthorizedException(Errors.CREDENTIALS_INVALID);
      }
      const payload = { id: user.id, email: user.email, sub: user.id };
      return {
        accessToken: await this.jwtService.signAsync(payload, {
          expiresIn: this.configService.get<string>('config.accessTokenExpires'),
        }),
        accessTokenExpiresIn: new Date(
          Date.now() + getMilliseconds(this.configService.get<string>('config.accessTokenExpires'))
        ),
        refreshToken: await this.jwtService.signAsync(payload, {
          expiresIn: this.configService.get<string>('config.refreshTokenExpires'),
          secret: this.configService.get<string>('config.refreshTokenSecret'),
        }),
      };
    } else {
      throw new BadRequestException();
    }
  }

  async signUp(email: string, password: string): Promise<any> {
    this.validatePassword(password);
    const user = await this.userRepository.findOne({ email });
    if (user) {
      throw new BadRequestException(Errors.EMAIL_ALREADY_EXISTS);
    } else {
      const passwordEncrypted = await bcrypt.hash(password, this.SALT_ROUNDS);
      const userCreated = await this.userRepository.save({
        email,
        passwordEncrypted,
      });
      const payload = {
        id: userCreated.id,
        email: userCreated.email,
        sub: userCreated.id,
      };
      return {
        accessToken: await this.jwtService.signAsync(payload, {
          expiresIn: this.configService.get<string>('config.accessTokenExpires'),
        }),
        accessTokenExpiresIn: new Date(
          Date.now() + getMilliseconds(this.configService.get<string>('config.accessTokenExpires'))
        ),
        refreshToken: await this.jwtService.signAsync(payload, {
          expiresIn: this.configService.get<string>('config.refreshTokenExpires'),
          secret: this.configService.get<string>('config.refreshTokenSecret'),
        }),
      };
    }
  }

  private validatePassword(password: string) {
    const passwordValidation = this.passwordValidator.validate(password, {
      details: true,
    });

    if (passwordValidation instanceof Array) {
      if (passwordValidation.length > 0) {
        throw new BadRequestException(passwordValidation);
      }
    }
  }

  async getAccessToken(refreshToken: string): Promise<any> {
    try {
      const refreshTokenPayload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('config.refreshTokenSecret'),
      });
      const user = await this.userRepository.findOne(refreshTokenPayload.id);
      const payload = {
        id: user.id,
        email: user.email,
        sub: user.id,
      };
      return {
        accessToken: await this.jwtService.signAsync(payload, {
          expiresIn: this.configService.get<string>('config.accessTokenExpires'),
        }),
        accessTokenExpiresIn: new Date(
          Date.now() + getMilliseconds(this.configService.get<string>('config.accessTokenExpires'))
        ),
        refreshToken: await this.jwtService.signAsync(payload, {
          expiresIn: this.configService.get<string>('config.refreshTokenExpires'),
          secret: this.configService.get<string>('config.refreshTokenSecret'),
        }),
      };
    } catch (error) {
      Logger.error(error);
      throw new BadRequestException('Token invalido o ya expiró.');
    }
  }
}

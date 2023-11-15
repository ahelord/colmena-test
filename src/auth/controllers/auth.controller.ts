import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { SignUpDto } from '../dtos/sign-up.dto';
import { LoginDto } from '../dtos/login.dto';
import { TokenDto } from '../dtos/token.dto';
import { Public } from '../decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto.email, loginDto.password);
  }
  @Public()
  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto) {
    return await this.authService.signUp(signUpDto.email, signUpDto.password);
  }

  @Public()
  @Post('access-token')
  async getAccessToken(@Body() tokenDto: TokenDto) {
    return await this.authService.getAccessToken(tokenDto.refreshToken);
  }
}

import { Body, Controller, Get, HttpCode, Post, Req } from '@nestjs/common';
import { AuthService } from '@modules/auth';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppController } from '@src';
import { Public } from '@decorators';
import { Request } from 'express';
import {
  SignInUserInputDto,
  SignInUserOutputDto,
  AuthUserOutputDto,
} from '@modules/auth/dtos';

@Controller('auth')
@ApiTags('Auth')
export class AuthController extends AppController {
  constructor(private readonly authService: AuthService) {
    super();
  }

  @Public()
  @Post('sign-in')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Authenticates an user.',
  })
  public async signInUser(
    @Body() signInUserInputDto: SignInUserInputDto,
  ): Promise<SignInUserOutputDto> {
    return await this.authService.signInUser(signInUserInputDto);
  }

  @Get('me')
  @ApiOperation({
    summary: 'Validate an authenticated user.',
  })
  public async userMe(@Req() request: Request): Promise<AuthUserOutputDto> {
    return await this.authService.userMe(request['sessionUser']);
  }
}

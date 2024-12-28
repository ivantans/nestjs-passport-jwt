import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guard/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) { }

  @UseGuards(LocalAuthGuard)
  @Post("login")
  login(@Req() req: Request) {
    const token = this.authService.login(req.user);
    return {
      token
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get("/profile")
  getUser(@Req() req: Request) {
    return req.user
  }

}

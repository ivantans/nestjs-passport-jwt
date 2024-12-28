import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';


const users = [
  {
    id: 1,
    username: "John",
    password: "password"
  },
  {
    id: 2,
    username: "Claudia",
    password: "password"
  }
]

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService
  ) { }

  validateUser(loginDto: LoginDto) {
    const findUser = users.find((user) => loginDto.username === user.username);
    if (!findUser) {
      return null;
    }

    if (loginDto.password !== findUser.password) {
      return null;
    }

    const { password, ...result } = findUser;
    return result;
  }

  login(user) {
    const token = this.jwtService.sign(user);
    return token
  }

}

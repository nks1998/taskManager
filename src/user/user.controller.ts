import { Controller, Get, Post, Body, Param, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { AuthCredentialDto } from './dto/authCredential.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './getUser.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  async create(@Body() createUserDto: AuthCredentialDto): Promise<void> {
    return this.userService.createUser(createUserDto);
  }

  @Post('/signin')
  async signIn(@Body() createUserDto: AuthCredentialDto) {
    return this.userService.signIn(createUserDto);
  }

  @Get()
  @UseGuards(AuthGuard())
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  test(@GetUser() user: User){
    console.log(user);
  }

}

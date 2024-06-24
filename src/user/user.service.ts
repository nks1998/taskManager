import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthCredentialDto } from './dto/authCredential.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwtPayload.interface';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: UserRepository,
        private jwtService: JwtService
      ) {}

      private async hashedPassword(password: string, salt: string):Promise<string>{
        return await bcrypt.hash(password, salt)
      }
      private async validateUserPassword(authCredentialDto: AuthCredentialDto): Promise<string> {
        const {username, password} = authCredentialDto;
        const user = await this.userRepository.findOne({ where: { username } });

        if(user && await user.validateUserPassword(password)){
            return user.username
        }else{
            return null
        }
      }
      async signIn(authCredentialDto: AuthCredentialDto){
        const username = await this.validateUserPassword(authCredentialDto);

        if(!username){
            throw new UnauthorizedException("Invalid Credential!")
        }
        const payload: JwtPayload = {username}
        const accessToken = await this.jwtService.sign(payload)

        return {accessToken}
      }
    
      async createUser(authCredentialDto: AuthCredentialDto): Promise<void> {
        const {username, password} = authCredentialDto;
        const user = new User();

        const salt = await bcrypt.genSalt();
        user.username = username;
        user.salt = salt;
        user.password = await this.hashedPassword(password, salt);

        try {
            await this.userRepository.save(user);
        }catch(err){
            if(err.code == 23505){
                throw new ConflictException('Username is already exist!')
            }else{
                throw new InternalServerErrorException();
            }
        }
      }
    
      async findAll(): Promise<User[]> {
        return this.userRepository.find();
      }
    
}

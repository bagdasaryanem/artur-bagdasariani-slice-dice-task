import { Resolver, Mutation, Args } from '@nestjs/graphql';

import { AuthService } from './auth.service';
import { JwtPayloadDto } from './dto/jwt-payload.dto';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => JwtPayloadDto)
  async signUp(
    @Args('authCredentialsDto') authCredentialsDto: AuthCredentialsDto,
  ) {
    return await this.authService.signUp(authCredentialsDto);
  }

  @Mutation(() => JwtPayloadDto)
  async signIn(
    @Args('authCredentialsDto') authCredentialsDto: AuthCredentialsDto,
  ): Promise<JwtPayloadDto> {
    return await this.authService.signIn(authCredentialsDto);
  }
}

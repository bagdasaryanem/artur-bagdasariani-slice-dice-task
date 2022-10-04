import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, MaxLength, MinLength } from 'class-validator';

@InputType()
export class AuthCredentialsDto {
  @Field()
  @IsEmail()
  email: string;

  @MinLength(8)
  @MaxLength(20)
  @Field()
  password: string;

  @Field({ nullable: true })
  name?: string;
}

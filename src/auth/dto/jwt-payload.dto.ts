import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class JwtPayloadDto {
  @Field()
  accessToken: string;
}

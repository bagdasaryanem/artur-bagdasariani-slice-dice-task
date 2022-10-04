import { InputType, Int, Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SsDto {
  @Field({ nullable: true })
  department: string;

  @Field({ nullable: true })
  sub_department: string;

  @Field()
  min: string;

  @Field()
  max: string;

  @Field()
  mean: string;
}

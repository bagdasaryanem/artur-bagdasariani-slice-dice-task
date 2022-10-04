import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateEmployeeDto {
  @Field()
  name: string;

  @Field()
  salary: number;

  @Field()
  currency: string;

  @Field()
  department: string;

  @Field()
  subDepartment: string;
}

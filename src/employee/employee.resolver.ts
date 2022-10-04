import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  registerEnumType,
} from '@nestjs/graphql';
import { EmployeeService } from './employee.service';
import { Employee } from './entities/employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { SsDto } from './dto/ss.dto';
import { SsType } from './types/ss-type.enum';
import { CurrentUser } from 'src/auth/user.decorator';
import { User } from 'src/auth/user.entity';

@UseGuards(GqlAuthGuard)
@Resolver(() => Employee)
export class EmployeeResolver {
  constructor(private readonly employeeService: EmployeeService) {}

  @Mutation(() => Employee)
  createEmployee(
    @Args('createEmployeeDto') createEmployeeDto: CreateEmployeeDto,
  ) {
    return this.employeeService.create(createEmployeeDto);
  }

  @Query(() => [SsDto])
  findSS(@Args('type', { type: () => SsType, nullable: true }) type: SsType) {
    return this.employeeService.findSS(type);
  }

  @Mutation(() => String)
  removeEmployee(
    @Args('id', { type: () => Int }) id: number,
    @CurrentUser() user: User,
  ) {
    return this.employeeService.remove(id, user);
  }
}

import { registerEnumType } from '@nestjs/graphql';

export enum SsType {
  onContract = 'onContract',
  eachDepartment = 'eachDepartment',
  nestedDepartments = 'nestedDepartments',
}

registerEnumType(SsType, { name: 'SsType' });

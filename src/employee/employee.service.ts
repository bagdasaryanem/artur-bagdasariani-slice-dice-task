import { Repository } from 'typeorm';
import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Employee } from './entities/employee.entity';
import { SsType } from './types/ss-type.enum';
import { User } from 'src/auth/user.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}
  create(createEmployeeDto: CreateEmployeeDto) {
    return this.employeeRepository.save(createEmployeeDto);
  }

  async findSS(type?: SsType) {
    const result = await this.employeeRepository.query(`
      SELECT 
        ${
          type === SsType.eachDepartment || type === SsType.nestedDepartments
            ? 'department,'
            : ''
        }
        ${type === SsType.nestedDepartments ? 'sub_department,' : ''}
        MIN(salary) as min,
        MAX(salary) as max,
        AVG(salary) as mean
      FROM employee
      ${type === SsType.onContract ? 'WHERE on_contract = TRUE' : ''}
      ${type === SsType.eachDepartment ? 'GROUP BY department' : ''}
      ${
        type === SsType.nestedDepartments
          ? 'GROUP BY department, sub_department'
          : ''
      };
    `);

    return result;
  }

  async remove(id: number, user: User) {
    const employee = await this.employeeRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    if (employee.user.id !== user.id) {
      throw new ForbiddenException(
        'You are not allowed to delete this employee',
      );
    }

    await this.employeeRepository.delete(id);
    return 'success';
  }
}

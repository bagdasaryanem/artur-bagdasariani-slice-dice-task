import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';

import { EmployeeService } from './employee.service';
import { Employee } from './entities/employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { User } from 'src/auth/user.entity';

describe('EmployeeService', () => {
  let service: EmployeeService;
  let employeeRepository: Repository<Employee>;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeeService,
        {
          provide: getRepositoryToken(Employee),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
            query: jest.fn(),
          },
        },
      ],
    }).compile();

    service = moduleRef.get<EmployeeService>(EmployeeService);
    employeeRepository = moduleRef.get<Repository<Employee>>(
      getRepositoryToken(Employee),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create an employee', async () => {
      const employee = new Employee();
      employee.id = 1;
      employee.name = 'John Doe';
      employee.salary = 1000;
      employee.department = 'IT';
      employee.subDepartment = 'Backend';
      employee.onContract = true;

      jest.spyOn(employeeRepository, 'save').mockResolvedValue(employee);

      expect(await service.create(employee as CreateEmployeeDto)).toEqual(
        employee,
      );
    });
  });

  describe('remove', () => {
    const user = { id: 1 } as User;

    it('should throw `employee Not Found` Http exception, if employee is not found', async () => {
      expect.hasAssertions();

      try {
        await service.remove(1, user);
      } catch (err) {
        expect(err.response).toEqual({
          error: 'Not Found',
          message: 'Employee not found',
          statusCode: 404,
        });
      }
    });

    it('should throw `Forbidden` Http exception, if user is not owner of employee', async () => {
      expect.hasAssertions();

      jest.spyOn(employeeRepository, 'findOne').mockResolvedValue({
        user: { id: 2 },
      } as Employee);

      try {
        await service.remove(1, user);
      } catch (err) {
        expect(err.response).toEqual({
          error: 'Forbidden',
          message: 'You are not allowed to delete this employee',
          statusCode: 403,
        });
      }
    });

    it('should remove an employee', async () => {
      const employee = { id: 1, user } as Employee;

      jest.spyOn(employeeRepository, 'findOne').mockResolvedValue(employee);
      jest.spyOn(employeeRepository, 'delete');

      const result = await service.remove(1, user);

      expect(employeeRepository.delete).toBeCalled();
      expect(result).toEqual('success');
    });
  });

  describe('findSS', () => {
    it('should return the correct SS', async () => {
      const value = [
        {
          min: 1000,
          max: 1000,
          mean: 1000,
        },
      ];

      jest.spyOn(employeeRepository, 'query').mockResolvedValue(value);

      const result = await service.findSS();

      expect(result).toEqual(value);
    });
  });
});

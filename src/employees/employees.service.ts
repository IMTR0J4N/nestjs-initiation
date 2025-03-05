import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { LoggerService } from 'src/logger/logger.service';

@Injectable()
export class EmployeesService {

  constructor(private readonly databaseService: DatabaseService) { }

  private readonly Logger = new LoggerService(EmployeesService.name);

  async create(createEmployeeDto: Prisma.EmployeeCreateInput) {

    this.Logger.log(`Creating employee with email ${createEmployeeDto.email}`, EmployeesService.name);

    return this.databaseService.employee.create({ data: createEmployeeDto });
  }

  async findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      this.Logger.log(`Fetching all employees ${role && `with role ${role}` || ``}`, EmployeesService.name);

      return this.databaseService.employee.findMany({ where: { role } });
    }

    this.Logger.log(`Fetching all employees`, EmployeesService.name);

    return this.databaseService.employee.findMany();
  }

  async findOne(id: number) {
    this.Logger.log(`Fetching employee with id ${id}`, EmployeesService.name);

    return this.databaseService.employee.findUnique({ where: { id } });
  }

  async update(id: number, updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    this.Logger.log(`Updating employee with id ${id}`, EmployeesService.name);

    return this.databaseService.employee.update({ where: { id }, data: updateEmployeeDto });
  }

  async remove(id: number) {
    this.Logger.log(`Deleting employee with id ${id}`, EmployeesService.name);
    
    return this.databaseService.employee.delete({ where: { id } });
  }
}

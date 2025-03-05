import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Prisma } from '@prisma/client';
import { LoggerService } from 'src/logger/logger.service';


@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) { }

  private readonly Logger = new LoggerService(EmployeesController.name);

  @Post()
  create(@Body() createEmployeeDto: Prisma.EmployeeCreateInput) {
    return this.employeesService.create(createEmployeeDto);
  }

  @Get()
  findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    try {
      this.Logger.log(`Requesting all employees ${role && `with role ${role}` || ``}`, EmployeesController.name);

      return this.employeesService.findAll(role);
    } catch (error) {
      this.Logger.error(error, EmployeesController.name);
    }
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      this.Logger.log(`Requesting employee with id ${id}`, EmployeesController.name);

      return this.employeesService.findOne(id);
    } catch (error) {
      this.Logger.error(error, EmployeesController.name);
    }
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    try {
      this.Logger.log(`Requesting update of employee with id ${id}`, EmployeesController.name);

      return this.employeesService.update(id, updateEmployeeDto);
    } catch (error) {
      this.Logger.error(error, EmployeesController.name);
    }
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    try {
      this.Logger.log(`Requesting deletion of employee with id ${id}`, EmployeesController.name);

      return this.employeesService.remove(id);
    } catch (error) {
      this.Logger.error(error, EmployeesController.name);
    }
  }
}

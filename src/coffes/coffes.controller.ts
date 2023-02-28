import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { Roles } from 'src/iam/authorization/decortators/role.decorator';
import { ActiveUser } from 'src/iam/decorators/active-user.decorator';
import { IActiveUser } from 'src/iam/interfaces/active-user.interface';
import { Role } from 'src/users/enums/role.enum';
import { CoffesService } from './coffes.service';
import { CreateCoffeDto } from './dto/create-coffe.dto';
import { UpdateCoffeDto } from './dto/update-coffe.dto';

@Controller('coffes')
export class CoffesController {
  constructor(private readonly coffesService: CoffesService) {}
	@Roles(Role.Admin)
  @Post()
  create(@Body() createCoffeDto: CreateCoffeDto) {
    return this.coffesService.create(createCoffeDto);
  }

  @Get()
  findAll(@ActiveUser() user: IActiveUser) {
    console.log(user);
    
    return this.coffesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coffesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoffeDto: UpdateCoffeDto) {
    return this.coffesService.update(+id, updateCoffeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coffesService.remove(+id);
  }
}

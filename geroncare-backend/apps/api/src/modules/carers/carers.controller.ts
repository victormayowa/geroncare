import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Public } from '../../common/decorators/public.decorator';
import { CarersService } from './carers.service';

@ApiTags('carers')
@Controller('carers')
export class CarersController {
  constructor(private carersService: CarersService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all verified carers' })
  async findAll() {
    return this.carersService.findAll();
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get carer by ID' })
  async findOne(@Param('id') id: string) {
    return this.carersService.findOne(id);
  }
}

import { Controller, Get, UseGuards } from '@nestjs/common';
import { RentalsService } from './rentals.service';
import { JwtAuthGuard } from 'src/auth/jwt-authguard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('rentals')
@Controller('rentals')
export class RentalsController {
  constructor(private readonly rentalsService: RentalsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get all rentals' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getRentals() {
    return this.rentalsService.getAllRentals();
  }
}

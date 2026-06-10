import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { RentalsService } from './rentals.service';
import { JwtAuthGuard } from 'src/auth/jwt-authguard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateRentalsDto } from './dto/create-rentals.dto';
import { UpdateRentalsDto } from './dto/update-rentals.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiBearerAuth()
@ApiTags('rentals')
@Controller('rentals')
export class RentalsController {
  constructor(private readonly rentalsService: RentalsService) {}

  @Post()
  @ApiOperation({ summary: 'Register new rental' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 409, description: 'Conflict' })
  @UseInterceptors(FileInterceptor('picture'))
  async create(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000 }),
          new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body() createUserDto: CreateRentalsDto,
  ) {
    console.log(file);
    return await this.rentalsService.createRental(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get all rentals' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getRentals() {
    return this.rentalsService.getAllRentals();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  @ApiOperation({ summary: 'Get one rental' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getRental(@Param('id', ParseIntPipe) id: number) {
    return this.rentalsService.getRental(id);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update new rental' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 409, description: 'Conflict' })
  @UseInterceptors(FileInterceptor('picture'))
  async update(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 200000 }),
          new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    picture: Express.Multer.File,
    @Body() updateRentalsDto: UpdateRentalsDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    console.log(picture);
    return await this.rentalsService.updateRental(
      updateRentalsDto,
      picture.buffer,
      id,
    );
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CancionService } from './cancion.service';
import { CreateCancionDto, UpdateCancionDto } from './dto/Canciondto';

@Controller('album/:albumId/songs') 
export class CancionController {
  constructor(private readonly cancionService: CancionService) {}

  
  @Get()
  findAll(@Param('albumId') albumId: string) {
    return this.cancionService.findAllByAlbum(+albumId);
  }

 
  @Get(':id')
  findOne(@Param('albumId') albumId: string, @Param('id') id: string) {
    return this.cancionService.findOne(+id);
  }

  
  @Post()
  @UseInterceptors(
    FileInterceptor('archivo', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const originalName = file.originalname.split('.')[0];
          const fileExtName = file.originalname.split('.').pop();
          cb(null, `${originalName}-${uniqueSuffix}.${fileExtName}`);
        },
      }),
    }),
  )
  async create(
    @Param('albumId') albumId: string,
    @Body() createCancionDto: CreateCancionDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      createCancionDto.archivo = file.filename;
    }
    createCancionDto.albumId = +albumId; 
    return this.cancionService.create(createCancionDto);
  }

  
  @Put(':id')
  @UseInterceptors(
    FileInterceptor('archivo', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const originalName = file.originalname.split('.')[0];
          const fileExtName = file.originalname.split('.').pop();
          cb(null, `${originalName}-${uniqueSuffix}.${fileExtName}`);
        },
      }),
    }),
  )
  async update(
    @Param('id') id: string,
    @Body() updateCancionDto: UpdateCancionDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      updateCancionDto.archivo = file.filename;
    }
    return this.cancionService.update(+id, updateCancionDto);
  }

  
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cancionService.remove(+id);
  }
}

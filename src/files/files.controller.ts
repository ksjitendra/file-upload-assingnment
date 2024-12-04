import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile, Request, Response, Query } from '@nestjs/common';
import { FilesService } from './files.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { GetFileListDto } from './files.dto';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}
  @UseGuards(AuthGuard)
  @Post('upload')
  // updating fileinterceptro with using diskStorage and generating a unique name for the image and saving it in the uploads folder
  @UseInterceptors(FileInterceptor(
    'file',
    {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          cb(null, `${Date.now()}-${file.originalname}`)
        }
      })
    }
  ))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Request() req, @Response() res) {

    const imageMeta = {
      name: file.filename,
      path: file.path,
      uploadedBy: req.user.id
    }

    const resp = await this.filesService.create(imageMeta);
    return res.status(resp.statusCode).json(resp);


  }

  @UseGuards(AuthGuard)
  @Get('list')
  async findAll(@Request() req, @Response() res, @Query() queryData: GetFileListDto) {
    const resp = await this.filesService.findAll(req.user.id, queryData);
    return res.status(resp.statusCode).json(resp);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req, @Response() res) {
    const userId = req.user.id;
    const resp = await this.filesService.findOne(+id, userId);  
    return res.status(resp.statusCode).json(resp);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req, @Response() res) {
    const resp = await this.filesService.remove(+id, req.user.id);
    return res.status(resp.statusCode).json(resp);
  }
}

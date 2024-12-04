import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IresponseObject } from 'src/common/app.interfaces';
import { Files } from './models/file.model';
import { FILE_REPOSITORY } from './files.repositories';
import * as fs from 'fs';



@Injectable()
export class FilesService {

 constructor(
   @Inject(FILE_REPOSITORY)
   private readonly filesRepository: typeof Files
 ) {}


  async create(filedata): Promise<IresponseObject> {

    try {

      const  saveFile = await this.filesRepository.create(filedata);
      return { statusCode: HttpStatus.CREATED, message: 'File uploaded successfully', data: saveFile };
      
    } catch (error) {
      console.log(error);
      return { statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Internal server error', error: error.message, data: null };
      
      
    }
  }

  async findAll(userId: number, queryData): Promise<IresponseObject> {
    try {

      
       const getAllFiles = await this.filesRepository.findAndCountAll({
         where: { uploadedBy: userId },
         limit: queryData.limit,
         offset: (queryData.page - 1) * queryData.limit,
         attributes: ['id', 'name', 'path'],
         order: [['createdAt', 'DESC']]
       });
         
       return { statusCode: HttpStatus.OK, message: 'Files fetched successfully', data: getAllFiles };
    } catch (error) {
      console.log(error);
      return { statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Internal server error', error: error.message, data: null };
  
    }
  }

  async findOne(id: number, userId: number): Promise<IresponseObject> {
    try {
      const getFile = await this.filesRepository.findOne({ where: { id, uploadedBy: userId }, attributes: ['id', 'name', 'path'] });
      return { statusCode: HttpStatus.OK, message: 'File fetched successfully', data: getFile };
    } catch (error) {
      console.log('[file service]', error);
      return { statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Internal server error', error: error.message, data: null };
      
    }

  }


  async remove(id: number, userId: number): Promise<IresponseObject> {
    try {


      // getting the file details from the db and if file exist need to unlink from the folder
      const fileDetails = await this.filesRepository.findOne({ where: { id, uploadedBy: userId } });
      if (!fileDetails) {
        return { statusCode: HttpStatus.NOT_FOUND, message: 'File does not exist', data: null };
       
      }


       const filePath = fileDetails.path;

       // unlinking file 
       await fs.unlinkSync(filePath);

      const deleteFile = await this.filesRepository.destroy({ where: { id, uploadedBy: userId } });
      return { statusCode: HttpStatus.OK, message: 'File deleted successfully', data: null };
      
    } catch (error) {
      console.log('[file service]', error);
      return { statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Internal server error', error: error.message, data: null };
      
    }
  }
}

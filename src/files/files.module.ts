import { Module, Provider } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { fileProviders } from './files.repositories';

@Module({
  controllers: [FilesController],
  providers: [FilesService, ...(fileProviders as Provider[])],

})
export class FilesModule {}

import { Module } from '@nestjs/common';
import { StorageServiceService } from './storage-service.service';

@Module({
  providers: [StorageServiceService],
})
export class StorageServiceModule {}

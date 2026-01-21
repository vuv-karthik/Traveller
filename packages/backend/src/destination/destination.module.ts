import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DestinationService } from './destination.service';
import { DestinationController } from './destination.controller';
import { Destination, DestinationSchema } from './destination.schema';
import { MockPlacesProvider } from './external-places.provider';

@Module({
    imports: [MongooseModule.forFeature([{ name: Destination.name, schema: DestinationSchema }])],
    controllers: [DestinationController],
    providers: [
        DestinationService,
        {
            provide: 'ExternalPlacesProvider',
            useClass: MockPlacesProvider,
        },
    ],
    exports: [DestinationService],
})
export class DestinationModule { }

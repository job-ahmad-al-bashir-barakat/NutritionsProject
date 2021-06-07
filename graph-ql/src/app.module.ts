import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NutritionsModule } from './nutritions/nutritions.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    NutritionsModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
    }),
    MongooseModule.forRoot('mongodb+srv://test:test@cluster0.hzdrt.mongodb.net/nutritions?retryWrites=true&w=majority')
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

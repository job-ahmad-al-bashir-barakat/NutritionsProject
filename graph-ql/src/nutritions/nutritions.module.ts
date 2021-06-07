import { Module } from '@nestjs/common';
import { NutritionsResolver } from './nutritions.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Nutrition, NutritionSchema } from './schemas/nutrition.schema';
import { NutritionsService } from './nutritions.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Nutrition.name, schema: NutritionSchema }])],
  providers: [NutritionsResolver, NutritionsService],
})
export class NutritionsModule {}

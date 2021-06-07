import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Nutrition, NutritionDocument } from './schemas/nutrition.schema';
import {NutritionInput} from "./inputs/nutrition.input";

@Injectable()
export class NutritionsService {
  constructor(@InjectModel(Nutrition.name) private nutritionModel: Model<NutritionDocument>) {}

  async create(nutritionInput: NutritionInput): Promise<Nutrition> {
    const createdNutrition = new this.nutritionModel(nutritionInput);
    return createdNutrition.save();
  }

  async findAll(): Promise<Nutrition[]> {
    return this.nutritionModel.find().exec();
  }

  async delete(id: string): Promise<Nutrition> {
      return this.nutritionModel.findByIdAndDelete(id);
  }
}

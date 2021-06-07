import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NutritionDocument = Nutrition & Document;

@Schema()
export class Nutrition {
  @Prop()
  dessert: string;
  @Prop(raw({
    calories: { type: String },
    fat: { type: String },
    carb: { type: String },
    protein: { type: String }
  }))
  nutritionInfo: Record<string, any>;
}

export const NutritionSchema = SchemaFactory.createForClass(Nutrition);
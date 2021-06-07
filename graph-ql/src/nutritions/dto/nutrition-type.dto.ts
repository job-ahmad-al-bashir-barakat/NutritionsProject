import {Field, ID, ObjectType} from '@nestjs/graphql';

@ObjectType()
class NutritionInfo {
  @Field()
  calories: number;
  @Field()
  protein: number;
  @Field()
  carb: number;
  @Field()
  fat: number;
}

@ObjectType()
export class NutritionType {
  @Field(() => ID)
  readonly id?: string;
  @Field()
  readonly dessert: string;
  @Field(type => NutritionInfo)
  readonly nutritionInfo: object;
}
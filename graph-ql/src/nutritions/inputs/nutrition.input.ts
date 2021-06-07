import {Field, ID, InputType} from "@nestjs/graphql";

@InputType()
class NutritionInfoInput {
    @Field()
    calories: number;
    @Field()
    protein: number;
    @Field()
    carb: number;
    @Field()
    fat: number;
}

@InputType()
export class NutritionInput {
    @Field()
    readonly dessert: string;
    @Field(type => NutritionInfoInput)
    readonly nutritionInfo: object;
}
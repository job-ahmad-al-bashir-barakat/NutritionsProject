import {Resolver, Query, Mutation, Args} from '@nestjs/graphql';
import { NutritionsService } from './nutritions.service';
import { NutritionType } from './dto/nutrition-type.dto';
import {NutritionInput} from "./inputs/nutrition.input";

@Resolver()
export class NutritionsResolver {
  constructor(
    private nutritionsService: NutritionsService,
  ) {}

  @Query(() => [NutritionType])
  async nutritions() {
      return this.nutritionsService.findAll();
  }

  @Mutation(() => NutritionType)
  async createNutrition(@Args('input') input: NutritionInput) {
      return this.nutritionsService.create(input);
  }

  @Mutation(() => NutritionType)
  async deleteNutrition(@Args('id') id: string) {
      return this.nutritionsService.delete(id);
  }
}
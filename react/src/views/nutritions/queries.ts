import {gql} from "@apollo/client";

const getNutritions = gql`
  query nutritions {
    nutritions {
      id
      dessert
      nutritionInfo {
         calories
         fat
         carb
         protein
      }
    }
  }
`;

const deleteNutrition = gql`
  mutation deleteNutrition($id: String!) {
    deleteNutrition(id: $id) {
      id
    }
  }
`;

const createNutrition = gql`
  mutation createNutrition(
    $dessert: String!,
    $calories: Float!, 
    $protein: Float!, 
    $carb: Float!, 
    $fat: Float! 
  ) {
      createNutrition(input: {
        dessert: $dessert,  
        nutritionInfo: {
          calories: $calories,
          protein: $protein,
          carb: $carb,
          fat: $fat
        }
      }) {
        dessert
      }
  }
 
`;


export { getNutritions, deleteNutrition, createNutrition  }

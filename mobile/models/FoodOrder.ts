import Food from './Food';
import { Meal } from './Meal'
import Patient from './Patient';

export default interface FoodOrder {
    meal: Meal;
    food: Food;
    for: Patient;
    ordered_at: string;
}
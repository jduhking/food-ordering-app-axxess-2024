import Food from './Food';
import { Meal } from './Meal'
import { Status } from './Status';
import Patient from './Patient';

export default interface FoodOrder {
    meal: Meal;
    food: Food;
    for: Patient;
    status: Status;
    delivered: boolean;
}
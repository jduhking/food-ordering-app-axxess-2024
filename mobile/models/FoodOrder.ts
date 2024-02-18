import Food from './Food';
import { Meal } from './Meal'
import { Status } from './Status';
import Patient from './Patient';

export default interface FoodOrder {
    _id?: string;
    meal: Meal;
    food: Food[];
    recipient: Patient;
    status: Status;
    delivered: boolean;
}
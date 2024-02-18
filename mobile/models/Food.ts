import { Diets } from "./Diets";
import { Category } from "./Category";

export default interface Food {
    _id?: string;
    name: string;
    picture_link: string;
    restricted_diets: Diets[];
    category: Category;
    quantity?: number;
}
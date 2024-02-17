import { Diets } from "./Diets";

export default interface Food {
    _id: string;
    name: string;
    restricted_diets: Diets[];

}
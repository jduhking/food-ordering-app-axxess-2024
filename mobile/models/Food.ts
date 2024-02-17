import { Diets } from "./Diets";

export default interface Food {
    id: string;
    name: string;
    restricted_diets: Diets[];

}
import { Diets } from "./Diets";

export default interface Patient {
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
    picture_link: string;
    phone_number: string;
    diet: Diets[];
    allergies: string[];
}
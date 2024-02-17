export default interface Patient {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    picture_link: string;
    phone_number: string;
    diet: string[];
    allergies: string[];
}
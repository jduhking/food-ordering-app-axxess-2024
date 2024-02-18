import { Category } from "@/models/Category";
import { Diets } from "@/models/Diets";
import Food from "@/models/Food";

export const foods: Food[] = [
    {
        _id: "1",
        name: "Chicken Noodle Soup",
        restricted_diets: [Diets.REGULAR, Diets.CARDIAC],
        category: Category.SOUP,
    },
    {
        _id: "2",
        name: "Grilled Salmon",
        restricted_diets: [Diets.CARDIAC],
        category: Category.ENTREE,
    },
    {
        _id: "3",
        name: "Mixed Green Salad",
        restricted_diets: [Diets.REGULAR],
        category: Category.SALAD,
    },
    {
        _id: "4",
        name: "Vegetable Stir Fry",
        restricted_diets: [Diets.REGULAR, Diets.CARDIAC],
        category: Category.ENTREE,
    },
    {
        _id: "5",
        name: "Fresh Fruit Platter",
        restricted_diets: [Diets.REGULAR],
        category: Category.SIDE,
    },
    {
        _id: "6",
        name: "Broccoli Cheddar Soup",
        restricted_diets: [Diets.REGULAR],
        category: Category.SOUP,
    },
    {
        _id: "7",
        name: "Apple Pie",
        restricted_diets: [Diets.REGULAR],
        category: Category.DESERT,
    },
    {
        _id: "8",
        name: "Baked Potato",
        restricted_diets: [Diets.REGULAR],
        category: Category.SIDE,
    },
    {
        _id: "9",
        name: "Roast Beef",
        restricted_diets: [Diets.CARDIAC],
        category: Category.ENTREE,
    },
    {
        _id: "10",
        name: "Orange Juice",
        restricted_diets: [Diets.REGULAR],
        category: Category.DRINK,
    },
];

from contextlib import asynccontextmanager
from pydantic import BaseModel, Field, ConfigDict
from fastapi import FastAPI, Body
from enum import Enum
from typing import List, Literal, Tuple, Union, Optional
from beanie import Document, PydanticObjectId, init_beanie, Link
from motor.motor_asyncio import AsyncIOMotorClient
from fastapi import FastAPI, Request, status
from fastapi.encoders import jsonable_encoder
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from beanie.operators import In, All, Or
from bson import ObjectId


@asynccontextmanager
async def lifespan(app : FastAPI):
    # before server starts
    print("Hello")
    await init(app)
    yield

    # before server ends
    print("World")
    pass

class DietOptions(Enum):
    REGULAR = "REGULAR"
    CONSISTANTCARB = "CONSISTANTCARB"
    CARDIAC = "CARDIAC"
class Category(Enum):
    DRINK = "DRINK"
    SOUP = "SOUP"
    SALAD = "SALAD"
    ENTREE = "ENTREE"
    DESERT = "DESERT"
    SIDE = "SIDE"
class Meal(Enum):
    BREAKFAST = "BREAKFAST"
    LUNCH = "LUNCH"
    DINNER = "DINNER"
class Status(Enum):
    PROCESSING = "PROCESSING"
    TRANSIT = "TRANSIT"
    DELIVERED = "DELIVERED"

DietOptionsType = Union[DietOptions, str]
MealType = Union[Meal, str]
StatusType = Union[Status, str]
CategoryType = Union[Category, str]

class Patient(Document):
    first_name: str
    last_name: str
    phone_number: str
    picture_link: str
    email: str
    diet: List[DietOptionsType]
    allergies: List[str]

class Food(Document): 
    name: str
    restricted_diets: List[DietOptionsType] = Field(default=[])
    picture_link: str
    category: CategoryType
    quantity: int

class FoodOrder(Document):
    meal: Optional[MealType]
    food: Optional[List[Food]]
    recipient: Optional[Patient]
    status: Optional[StatusType] = Field(default=Status.PROCESSING)
    delivered: Optional[bool] = Field(default=False)

async def init(app):
    # connect to mongo
    client = AsyncIOMotorClient("mongodb+srv://jduhking:Bab0debiyi_84@cluster0.f4envrr.mongodb.net/?retryWrites=true&w=majority")
    db = client.prod
    await init_beanie(database=db, document_models = [Patient, FoodOrder, Food], allow_index_dropping=True)
    try:
        info = await client.server_info()
        print(f"success, connected to {info}")
    except Exception as e:
        print(f"Failed with exception {e}")
    pass

app = FastAPI(lifespan=lifespan)

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content=jsonable_encoder({"detail": exc.errors(), "body": exc.body}),
    )

@app.get("/patients")
async def get_patients() -> List[Patient]:
    patients = await Patient.find_all().to_list()
    print(patients)
    return patients

@app.post("/order_food")
async def order_food(food_order: FoodOrder) -> Union[FoodOrder, bool]:
    print("Hello")
    try:
        print(food_order)
        await food_order.save()
    except Exception as e:
        print(f"Failed with exception {e}")

    return food_order

foods: List[Food] = [
{
    "name": "Chicken Noodle Soup",
    "restricted_diets": [DietOptions.CARDIAC],
    "picture_link": "https://hips.hearstapps.com/hmg-prod/images/chicken-noodle-soup-index-644c2bec1ce0c.jpg?crop=0.6666666666666666xw:1xh;center,top&resize=1200:*",
    "category": Category.SOUP,
    "quantity": 0
},
{
    "name": "Grilled Salmon",
    "restricted_diets": [DietOptions.CARDIAC],
    "category": Category.ENTREE,
    "picture_link": "https://thekitchengirl.com/wp-content/uploads/Grilled-Salmon-a_19-1.jpg",
    "quantity": 0
},
{
    "name": "Mixed Green Salad",
    "restricted_diets": [],
    "category": Category.SALAD,
    "picture_link": "https://www.simplyrecipes.com/thmb/g7OznJA-ACP4y1BRmP4pb5PXPGc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2009__02__mixed-green-salad-pecans-horiz-a-1800-176d0ecd090f416c97ea1ac681d4581d.jpg",
    "quantity": 0
},
{
    "name": "Vegetable Stir Fry",
    "restricted_diets": [DietOptions.CARDIAC],
    "category": Category.ENTREE,
    "picture_link" : "https://natashaskitchen.com/wp-content/uploads/2020/08/Vegetable-Stir-Fry-2.jpg",
    "quantity": 0
},
{
    "name": "Fresh Fruit Platter",
    "restricted_diets": [],
    "category": Category.SIDE,
    "picture_link" : "https://www.rednersmarkets.com/wp-content/uploads/2020/09/IMG_1575.jpg",
    "quantity": 0
},
{
    "name": "Broccoli Cheddar Soup",
    "restricted_diets": [],
    "category": Category.SOUP,
    "picture_link" : "https://hips.hearstapps.com/hmg-prod/images/broccoli-cheddar-soup-index-64ee61dee57d4.jpg?crop=0.502xw:1.00xh;0.321xw,0&resize=1200:*",
    "quantity": 0
},
{
    "name": "Apple Pie",
    "restricted_diets": [DietOptions.CONSISTANTCARB],
    "picture_link" : "https://www.spoonforkbacon.com/wp-content/uploads/2022/09/apple_pie_recipe_card.jpg",
    "category": Category.DESERT,
    "quantity": 0
},
{
    "name": "Baked Potato",
    "restricted_diets": [DietOptions.CONSISTANTCARB],
    "picture_link" : "https://www.foodandwine.com/thmb/WmSqUqk2hR42aez4_mff5veGjlY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/How-To-Bake-A-Potato-FT-BLOG0623-1b01215c4a2c4cf9bb26f395a738a20d.jpg",
    "category": Category.ENTREE,
    "quantity": 0
},
{
    "name": "Roast Beef",
    "restricted_diets": [DietOptions.CARDIAC],
    "picture_link" : "https://hips.hearstapps.com/hmg-prod/images/delish-roast-beef-horizontal-1540505165.jpg?crop=1xw:0.84375xh;center,top",
    "category": Category.ENTREE,
    "quantity": 0
},
{
    "name": "Orange Juice",
    "restricted_diets": [],
    "picture_link" : "https://www.alphafoodie.com/wp-content/uploads/2020/11/Orange-Juice-1-of-1-500x500.jpeg",
    "category": Category.DRINK,
    "quantity": 0
},
]

@app.get("/get_menu")
async def get_menu() -> List[Food]:
    try:
        food_list = await Food.find_all().to_list()
        print(food_list)
    except Exception as e:
        print(e)
        return False
    return food_list
@app.get("/food/{name}")
async def get_food(name: str) -> Union[Food, bool]:
    try: 
        food = await Food.find_one({ "name" : name})
        print('got the food')
        print(food)
    except Exception as e:
        print('This is the error')
        print('error ', e)
        return False
    if not food:
        print('Couldnt find food')
        return False
    print('attempting to return')
    return food

@app.get("/test")
async def test() -> Patient:

    user = await Patient.find_one({"first_name":  "Blessing"})
    
    if not user:
        user = Patient(first_name="Blessing", last_name="Odebiyi", phone_number="469-223-9792", email="blessingbodebiyi@gmail.com", diet=[DietOptions.REGULAR], allergies=[], picture_link="rando")
        await user.save()
        
    return user

# @app.get("/test2")
# async def test2() -> Food:

#     food = await Food.find_one({ "name" : ""})

# @app.get("/generate")
# async def generate_food() -> List[Food]:
#     try:
#         for i in range(len(foods)):
#             new_food = Food(name=foods[i]["name"], restricted_diets=foods[i]["restricted_diets"], picture_link=foods[i]["picture_link"], category=foods[i]["category"], quantity=foods[i]["quantity"] )
#             print(new_food)
#             await new_food.save()
#     except Exception as e:
#         print(e)
#         print('something went wrong')

#     return foods
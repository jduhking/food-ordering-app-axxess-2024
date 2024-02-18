from contextlib import asynccontextmanager
from pydantic import BaseModel, Field
from fastapi import FastAPI
from enum import Enum
from typing import List, Literal, Tuple, Union
from beanie import Document, PydanticObjectId, init_beanie
from motor.motor_asyncio import AsyncIOMotorClient

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
    category: CategoryType

class FoodOrder(Document):
    meal: Meal
    food: List[Food]
    status: StatusType = Field(default=Status.PROCESSING)
    delivered: bool = Field(default=False)

async def init(app):
    # connect to mongo
    client = AsyncIOMotorClient("mongodb+srv://jduhking:Bab0debiyi_84@cluster0.f4envrr.mongodb.net/?retryWrites=true&w=majority")
    db = client.prod
    await init_beanie(database=db, document_models = [Patient], allow_index_dropping=True)
    try:
        info = await client.server_info()
        print(f"success, connected to {info}")
    except Exception as e:
        print(f"Failed with exception {e}")
    pass

app = FastAPI(lifespan=lifespan)

@app.get("/patients")
async def get_patients() -> List[Patient]:
    patients = await Patient.find_all().to_list()
    print(patients)
    return patients

@app.get("/test")
async def test() -> Patient:

    user = await Patient.find_one({"first_name":  "Blessing"})
    
    if not user:
        user = Patient(first_name="Blessing", last_name="Odebiyi", phone_number="469-223-9792", email="blessingbodebiyi@gmail.com", diet=[DietOptions.REGULAR], allergies=[])
        await user.save()
        
    return user

# @app.get("/test2")
# async def test2() -> Food:

#     food = await Food.find_one({ "name" : ""})
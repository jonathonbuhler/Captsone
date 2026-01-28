import time
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fetch import fetch_laptop, Laptop, fetch_image
import pandas as pd

import db
import asyncio

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow all origins (for development)
    allow_credentials=True,
    allow_methods=["*"],  # allow GET, POST, PUT, etc.
    allow_headers=["*"],  # allow all headers
)

@app.on_event("startup")
async def startup():
    await db.main()

        

@app.get("/admin/load-imgs")
async def load_imgs():
    df = pd.read_csv("laptop.csv")
    for i,row in df.iterrows():
        if i < 42:
            continue
        print("loading", row["asin"])
        img_url = fetch_image(row["asin"])
        await db.add_img(img_url, row["asin"])
        print("added img")
        time.sleep(10)



    

@app.get("/admin/{asin}")
async def load_laptop_from_amazon(asin: str):
    if len(asin) != 10:
        raise HTTPException(status_code=400, detail="Invalid Asin")
    laptop = fetch_laptop(asin)
    return laptop

@app.get("/admin/check/{asin}")
async def check_laptop(asin):
    inside = await db.check_row(asin)
    if inside:
        return {"message": "yes"}
    else:
        return {"message": "no"}


@app.post("/admin/add")
async def add_laptop(laptop: Laptop):    
    print(laptop.asin)
    if await db.check_row(laptop.asin):
        return {"message": "Laptop already exists."}
    await db.add_row(laptop)
    return {"message": "Laptop added successfully"}

@app.get("/load/{asin}")
async def load_laptop(asin: str):
    return await db.load_one(asin)

@app.get("/load-all")
async def load_laptops():        
    return await db.load_all()

@app.post("/admin/edit")
async def edit_laptop(laptop: Laptop):
    await db.edit_row(laptop)
    return {"message": "Successful edit"}

@app.get("/load-shop")
async def load_shop(req: Request):
    return await db.load_shop(req)



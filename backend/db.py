import asyncpg as apg
import asyncio
from dotenv import load_dotenv
import os
import pandas as pd
from fetch import Laptop

load_dotenv()


pool = None

async def main():
    global pool
    try:        
        pool = await apg.create_pool(
            host='localhost',
            port=5432,
            database='capstone',
            user='admin',
            password=os.getenv("DB_PASSWORD"),
            min_size=1,
            max_size=5
        )
        print("Connection to PostgreSQL successful")
    except Exception as e:
        print("Connection to PostgreSQL failed")

async def add_from_csv():
    global pool
    async with pool.acquire() as conn:
        data = pd.read_csv("data.csv")
        for _, row in data.iterrows():
            await conn.execute(
                """INSERT INTO laptop(
                asin,title,model_number,model_name,brand,storage_capacity,
                cpu,cpu_cores,cpu_clock,ram_type,ram_capacity,touch_screen,
                screen_size,screen_width,screen_height,screen_refresh,
                battery_capacity,year,dedicated_gpu,gpu,rating,price)
                VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,
                $16,$17,$18,$19,$20,$21,$22)""",
                row['asin'],row['title'],row['model_number'],row['model_name'],
                row['brand'],row['storage_capacity'],row['cpu'],row['cpu_cores'],
                row['cpu_clock'],row['ram_type'],row['ram_capacity'],
                row['touch_screen']=="yes",row['screen_size'],row['screen_width'],
                row['screen_height'],row['screen_refresh'],row['battery_capacity'],
                row['year'],row['dedicated_gpu']=="Dedicated",row['gpu'],row['rating'],row['price'])
            
async def edit_row(laptop: Laptop):
    global pool
    async with pool.acquire() as conn:
        await conn.execute(
            """UPDATE laptop SET title=$2,model_number=$3,model_name=$4,
                brand=$5,storage_capacity=$6,cpu=$7,cpu_cores=$8,cpu_clock=$9,
                ram_type=$10,ram_capacity=$11,touch_screen=$12,screen_size=$13,
                screen_width=$14,screen_height=$15,screen_refresh=$16,
                battery_capacity=$17,year=$18,dedicated_gpu=$19,gpu=$20,rating=$21,
                price=$22,used=$23 WHERE asin = $1
            """,
            laptop.asin,laptop.title,laptop.model_number,laptop.model_name,
            laptop.brand,laptop.storage_capacity,laptop.cpu,laptop.cpu_cores,
            laptop.cpu_clock,laptop.ram_type,laptop.ram_capacity,laptop.touch_screen,
            laptop.screen_size,laptop.screen_width,laptop.screen_height,laptop.screen_refresh,
            laptop.battery_capacity,laptop.year,laptop.dedicated_gpu,laptop.gpu,laptop.rating,
            laptop.price,laptop.used
            )

async def add_row(laptop: Laptop):
    global pool
    async with pool.acquire() as conn:
        await conn.execute(
            """INSERT INTO laptop(
            asin,title,model_number,model_name,brand,storage_capacity,
            cpu,cpu_cores,cpu_clock,ram_type,ram_capacity,touch_screen,
            screen_size,screen_width,screen_height,screen_refresh,
            battery_capacity,year,dedicated_gpu,gpu,rating,price,used)
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,
            $16,$17,$18,$19,$20,$21,$22,$23)""",
            laptop.asin,laptop.title,laptop.model_number,laptop.model_name,
            laptop.brand,laptop.storage_capacity,laptop.cpu,laptop.cpu_cores,
            laptop.cpu_clock,laptop.ram_type,laptop.ram_capacity,laptop.touch_screen,
            laptop.screen_size,laptop.screen_width,laptop.screen_height,laptop.screen_refresh,
            laptop.battery_capacity,laptop.year,laptop.dedicated_gpu,laptop.gpu,laptop.rating,
            laptop.price,laptop.used
        )

async def check_row(asin):
    global pool
    async with pool.acquire() as conn:
        row = await conn.fetchrow(
            "SELECT asin FROM laptop WHERE asin=$1",
            asin            
        )
        return row != None
        
async def load_all():
    global pool
    async with pool.acquire() as conn:
        rows = await conn.fetch("SELECT * FROM laptop ORDER BY id DESC")
        return [dict(row) for row in rows]
    
async def load_one(asin):
    global pool
    async with pool.acquire() as conn:
        row = await conn.fetchrow("SELECT * FROM laptop WHERE asin=$1", asin)
        if row:
            return dict(row)
        return None

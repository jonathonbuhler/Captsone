import asyncio
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import StandardScaler

df = None
rf = None
sc = None

async def train(laptops, pref=list()):
    global df, rf, sc
    df = pd.DataFrame(laptops)
    df = df.set_index("id")
    df = pd.get_dummies(df, columns=["ram_type"])
    df["pixel_count"] = df["screen_width"] * df["screen_height"]        
    X = df.drop(columns=["price", "screen_width", "screen_height"])
    y = df["price"]
    sc = StandardScaler()
    sc.fit(X)
    X = sc.transform(X)
    rf = RandomForestRegressor(random_state=42, n_estimators=100)
    rf.fit(X,y)
    df.to_csv("ml.csv")
    fair_price = rf.predict(X)
    for i,p in enumerate(fair_price):
        fair_price[i] = round(p, 2)
    df["fair_price"] = fair_price
    preferences(df, pref)
    return df

async def predict_fair(laptop):
    global df, rf, sc    
    ldf = pd.DataFrame([laptop.dict()])        
    ldf["pixel_count"] = ldf["screen_width"] * ldf["screen_height"]
    ldf = ldf.drop(columns=["fair_price", "screen_width", "screen_height", "id", "brand", "asin", "cpu", "gpu", "img_url", "model_name", "model_number", "price", "title"])
    ldf = pd.get_dummies(ldf, columns=["ram_type"])
    ldf = ldf.reindex(columns=df.columns, fill_value=0)
    ldf = ldf.drop(columns=["fair_price", "price", "screen_height", "screen_width"])
    X = sc.transform(ldf) 
    return float(rf.predict(X)[0])
    
def preferences(laptops, p):
    def z_score(col, amount):
        std = laptops[col].std()
        if std == 0 or pd.isna(std):
            return
        boost = (laptops[col] - laptops[col].mean()) / (std + 1e-9)
        boost *= amount
        boost = 1+boost
        boost = boost.clip(0.8, 1.2)
        laptops["fair_price"] = laptops["fair_price"] * boost
    
    def bool_score(col, amount):
        boost = laptops[col].apply(lambda x: 1+amount if x else 1-amount)
        laptops["fair_price"] = laptops["fair_price"] * boost
        
    if "display" in p:
        z_score("pixel_count", 0.025)
        z_score("screen_size", 0.025)
    if "gpu" in p:
        bool_score("dedicated_gpu", 0.05)
    if "touch_screen" in p:
        bool_score("touch_screen", 0.05)
    if "battery" in p:
        z_score("battery_capacity", 0.05)
    if "cpu" in p:
        z_score("cpu_cores", 0.025)
        z_score("cpu_clock", 0.025)
    if "storage" in p:
        z_score("storage_capacity", 0.05)
    if "ram" in p:
        z_score("ram_capacity", 0.05)
    laptops["percent_diff"] = (laptops["price"] - laptops["fair_price"]) / laptops["fair_price"]
    
    return laptops
    





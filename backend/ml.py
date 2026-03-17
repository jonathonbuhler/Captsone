import asyncio
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import StandardScaler

async def update_fair(laptops):
    df = pd.DataFrame(laptops)
    df = df.set_index("id")

    df = pd.get_dummies(df, columns=["ram_type"])
    X = df.drop(columns=["price"])
    y = df["price"]
    sc = StandardScaler()
    sc.fit(X)
    X = sc.transform(X)

    rf = RandomForestRegressor()
    rf.fit(X,y)

    fair_price = rf.predict(X)    
    for i,p in enumerate(fair_price):
        fair_price[i] = round(p, 2)    
    df["fair_price"] = fair_price
    
    print(df.head())

    df.to_csv("ml.csv")

    return df






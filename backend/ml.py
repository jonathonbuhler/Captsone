import asyncio
import asyncpg
import pandas as pd
from sklearn.neighbors import KNeighborsRegressor
from sklearn.preprocessing import StandardScaler

df = pd.read_csv("backend/ml.csv", index_col="id")

df = pd.get_dummies(df, columns=["ram_type"])

X = df.drop(columns=["price"])
y = df["price"]


knn = KNeighborsRegressor(n_neighbors=3)
knn.fit(X,y)

fair_price = knn.predict(X)
for i,p in enumerate(fair_price):
    fair_price[i] = round(p, 2)



df["fair_price"] = fair_price

async def update_fair_prices():
    conn = await asyncpg.connect(
        user="admin",
        password="7Ne9!@fh*z",
        database="capstone",
        host="localhost"
    )
    update_values = [(float(row["fair_price"]), int(idx)) for idx, row in df.iterrows()]
    await conn.executemany(
        "UPDATE laptop SET fair_price = $1 WHERE id = $2;",
        update_values
    )

    await conn.close()


asyncio.run(update_fair_prices())
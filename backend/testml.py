from sklearn.metrics import mean_absolute_error, r2_score
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import cross_val_score


import pandas as pd

df = pd.read_csv("./backend/ml.csv")

X = df.drop(columns=["price", "fair_price"])
y = df["price"]


rf = RandomForestRegressor(
    n_estimators=300,
    max_depth=None,
    min_samples_split=2,
    min_samples_leaf=1,
    random_state=42,
    n_jobs=-1
)

rf.fit(X, y)

scores = cross_val_score(rf, X, y, cv=5, scoring="r2")
print(scores)

df["percent_diff"] = (df["price"] - df["fair_price"]) / df["fair_price"]

print(df["percent_diff"])
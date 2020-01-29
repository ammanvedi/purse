import pandas as pd
import numpy as np
from sklearn.naive_bayes import GaussianNB


priceFeatures = pd.read_csv('tfl.csv')
priceLabels = np.array(priceFeatures['price'])

features = pd.read_csv('tfl.csv')
labels = np.array(features['result'])


features = features.drop('result', axis=1)
features = features.drop('price', axis=1)
priceFeatures = priceFeatures.drop('price', axis=1)

#Create a Gaussian Classifier
model = GaussianNB()
modelPrice = GaussianNB()

# Train the model using the training sets
model.fit(features, labels)
modelPrice.fit(priceFeatures, priceLabels)

to_predict =     [
        [0, 0, 1],
        [1, 0, 2],
        [2, 0, 3],
        [3, 0, 4],
        [4, 0, 5],
        [5, 1, 6],
        [6, 1, 7],
        [0, 0, 8],
        [1, 0, 9],
        [2, 0, 10],
        [3, 0, 11],
        [4, 0, 12],
        [5, 1, 13],
        [6, 1, 14],
        [0, 0, 15],
        [1, 0, 16],
        [2, 0, 17],
        [3, 0, 18],
        [4, 0, 19],
        [5, 1, 20],
        [6, 0, 21],
        [0, 0, 22],
        [1, 0, 23],
        [2, 0, 24],
        [3, 0, 25],
        [4, 0, 26],
        [5, 1, 27],
        [6, 1, 28],
    ]
predictions = model.predict(to_predict)

# insert the prediction values into the price prediction
price_to_predict = [[x[0], x[1], x[2], predictions[i]] for i,x in enumerate(to_predict)]

print(price_to_predict)
pricePredictions = modelPrice.predict(price_to_predict)

print(predictions)
print(pricePredictions)
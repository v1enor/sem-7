import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
import matplotlib as mpl
from sklearn.preprocessing import StandardScaler
from tensorflow import keras
from tensorflow import nn

# Standardizing the size of all images 
mpl.rcParams['figure.figsize'] = (15,9)
mpl.rcParams['font.size'] = 15

df_train = pd.read_csv('DailyDelhiClimateTrain.csv')
df_train.head()

df_test = pd.read_csv('DailyDelhiClimateTest.csv')
df_test.head()

# Merging the datasets in one
df = pd.concat((df_test, df_train), ignore_index=True)
df['date'] = pd.to_datetime(df['date'])
df = df.sort_values(by=['date'])


columns = df.drop(columns=['date']).columns
for column in columns:
    sns.lineplot(x=df['date'], y=df[column])
    plt.title(column)
    plt.show()




# Function to convert our dataset in a time series dataset
def create_window(target, feature, window=1, offset=0):
    feature_new, target_new = [], []
    feature_np = feature.to_numpy()
    target_np = target.to_numpy()
    for i in range(window, target.shape[0] - offset):
        feature_list = feature_np[i - window:i]
        feature_new.append(feature_list.reshape(window, feature_np.shape[1]))
        target_new.append(target_np[i+offset].reshape(1))
    return np.array(feature_new), np.array(target_new)

# scale all the dataset (not including the date)
scaler = StandardScaler()
df_scaled = scaler.fit_transform(df.drop(columns='date'))
df_scaled = pd.DataFrame(df_scaled, columns=df.drop(columns='date').columns)

# Set the window to 10
window = 10
feature_columns = ['humidity', 'wind_speed', 'meanpressure', 'meantemp']

# Create a window with all the columns as features (excluding the date)
feature, target = create_window(df_scaled['meantemp'],df_scaled[feature_columns], window=window)
print(feature[0])
print(target[0])
print(df_scaled.head(12))

# Function to create train and test datasets
def train_test(feature, target, perc_train = 0.9):
    size_train = int(len(feature) * perc_train)

    x_train = feature[0:size_train]
    y_train = target[0:size_train]

    x_test = feature[size_train: len(feature)]
    y_test = target[size_train: len(feature)]

    return x_train, x_test, y_train, y_test


x_train, x_test, y_train, y_test = train_test(feature, target)

# Visualize the train and test data
sns.lineplot(x=df['date'].iloc[window:len(y_train) + window], y=y_train[:,0], label='Train')
sns.lineplot(x=df['date'].iloc[window + len(y_train):], y=y_test[:,0], label='Test')

# Create a standard model using LSTM
def model_lstm(x_shape):

    model = keras.Sequential()
    model.add(keras.layers.LSTM(64, input_shape=(x_shape[1], x_shape[2])))
    model.add(keras.layers.Dense(units=1))

    model.compile(loss='mean_squared_error', optimizer='RMSProp')
    return model

model = model_lstm(x_train.shape)
model.summary()
result = model.fit(x_train,y_train,validation_data=(x_test,y_test),epochs=50)

# Function to print the results of the fit process
def print_loss(result):
    plt.plot(result.history['loss'])
    plt.plot(result.history['val_loss'])
    plt.legend(['Train', 'Test'])
    plt.xlabel('Epochs')
    plt.ylabel('Cost')
    plt.show()

# Function to print the y_predicted compared with the y_test
def print_test_x_prediction(y_test, y_predict, df_date, train_size, window=0):
    sns.lineplot(x=df_date.iloc[train_size + window:], y=y_test[:,0], label = 'Test')
    sns.lineplot(x=df_date.iloc[train_size + window:], y=y_predict[:,0], label = 'Predict')
    plt.show()

y_predict = model.predict(x_test)

print_loss(result)
print_test_x_prediction(y_test, y_predict, df['date'], len(y_train), window=window)


import numpy as np
import matplotlib.pyplot as plt

RANDOM_SEED = 12
time = np.arange(5*365 + 1 ) # 5 years
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
# Load the dataset
data = pd.read_csv("data.csv")

# Check information about the dataset
data.info()

# Count the number of missing values
print(data.isnull().sum())

# Display the distribution of the 'Saving accounts' column before handling missing values
plt.figure(figsize=(8, 6))
plt.hist(data['Saving accounts'].dropna(), bins=10, edgecolor='k', alpha=0.5)
plt.title('Distribution before handling missing values')
plt.xlabel('Value')
plt.ylabel('Frequency')
plt.show()

# Visualize the presence of missing values before handling missing values
sns.heatmap(data.isnull(), cbar=False)
plt.title('Missing Values before handling')
plt.show()

# Fill missing values with 'Unknown'
data['Saving accounts'].fillna('Unknown', inplace=True)

# Visualize the presence of missing values after handling missing values
sns.heatmap(data.isnull(), cbar=False)
plt.title('Missing Values after handling')
plt.show()

# Display the distribution of the 'Saving accounts' column after handling missing values
plt.figure(figsize=(8, 6))
plt.hist(data['Saving accounts'], bins=10, edgecolor='k', alpha=0.5)
plt.title('Distribution after handling missing values')
plt.xlabel('Value')
plt.ylabel('Frequency')
plt.show()


# Create a boxplot of the 'Credit amount' column
plt.figure(figsize=(8, 6))
plt.boxplot(data["Duration"])
plt.title("Boxplot of Credit amount")
plt.ylabel("Credit amount")
plt.show()


# Convert non-numeric columns to numerical format
data_convert = data.apply(pd.to_numeric, errors='coerce')

# Print the updated dataset
print(data_convert)

# Count the occurrences of each class in the target variable
class_counts = data['Sex'].value_counts()

# Print the class counts
print(class_counts)



print(data_convert.var())


var_threshold = 0.1  # Пороговое значение дисперсии
low_var_features = []
for feature in data_convert.columns:
    if np.var(data_convert[feature]) < var_threshold:
        low_var_features.append(feature)

filtered_data = data_convert.drop(low_var_features, axis=1)

# Вывод отфильтрованного датасета
print(filtered_data.var())



# Расчет матрицы корреляции
correlation_matrix = data_convert.corr().abs()

# Задание порогового значения для высокой корреляции
corr_threshold = 0.8

# Поиск признаков с высокой корреляцией
high_corr_features = set()
n_features = correlation_matrix.shape[0]
for i in range(n_features):
    for j in range(i+1, n_features):
        if correlation_matrix.iloc[i, j] > corr_threshold:
            feature_i = correlation_matrix.columns[i]
            feature_j = correlation_matrix.columns[j]
            high_corr_features.add((feature_i, feature_j))

# Вывод признаков с высокой корреляцией
print(high_corr_features)


from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split

X_full = data[[...all columns...]]  
y = data['target']

X_train_full, X_test, y_train, y_test = train_test_split(X_full, y) 

logreg_full = LogisticRegression().fit(X_train_full, y_train)
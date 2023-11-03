import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np

# Load the dataset
data = pd.read_csv("data.csv")

# Check information about the dataset
data.info()

# Count the number of missing values
missing_values = data.isnull().sum()
print(missing_values)

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

# Check data balance
balanced = class_counts.value_counts()
print(balanced)
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np

# Загрузка датасета
data = pd.read_csv("data.csv")

# Проверка информации о датасете  
data.info()

# Подсчет пропущенных значений
missing_values = data.isnull().sum()
print(missing_values)

# Визуализация распределения столбца 'Saving accounts' до обработки пропущенных значений
plt.figure(figsize=(8, 6))
plt.hist(data['Saving accounts'].dropna(), bins=10, edgecolor='k', alpha=0.5)
plt.title('Distribution before handling missing values')
plt.xlabel('Value')
plt.ylabel('Frequency')
plt.show()

# Визуализация пропущенных значений до их обработки
sns.heatmap(data.isnull(), cbar=False)
plt.title('Missing Values before handling')
plt.show()

# Заполнение пропущенных значений 'Unknown'
data['Saving accounts'].fillna('Unknown', inplace=True)

# Визуализация пропущенных значений после обработки  
sns.heatmap(data.isnull(), cbar=False)
plt.title('Missing Values after handling')
plt.show()

# Визуализация распределения столбца 'Saving accounts' после обработки пропущенных значений
plt.figure(figsize=(8, 6))
plt.hist(data['Saving accounts'], bins=10, edgecolor='k', alpha=0.5)
plt.title('Distribution after handling missing values')
plt.xlabel('Value')
plt.ylabel('Frequency')
plt.show()

# Построение boxplot для столбца 'Credit amount'
plt.figure(figsize=(8, 6))
plt.boxplot(data["Duration"])
plt.title("Boxplot of Credit amount")
plt.ylabel("Credit amount")
plt.show()

# Преобразование нечисловых столбцов в числовой формат
data_convert = data.apply(pd.to_numeric, errors='coerce')

# Вывод обновленного датасета  
print(data_convert)

# Подсчет количества классов в целевой переменной
class_counts = data['Sex'].value_counts()
print(class_counts)

# Проверка сбалансированности классов
balanced = class_counts.value_counts()
print(balanced)


import pandas as pd
from sklearn.decomposition import PCA  
import numpy as np

# Загрузка данных
data = pd.read_csv('data.csv') 

# Выделение числовых признаков
X = data.select_dtypes(include=[np.number])

# Применение PCA 
pca = PCA(n_components=0.95)
X_reduced = pca.fit_transform(X)

print("Размерность данных до снижения:", X.shape)
print("Размерность данных после снижения:", X_reduced.shape)

# Выбор признаков с низкой дисперсией
low_variance = [col for col in X.columns if X[col].var() < 0.01]  
X_reduced = X.drop(low_variance, axis=1)

print("Размерность данных после удаления низкодисперсионных признаков:", X_reduced.shape)

# Выбор признаков с высокой корреляцией
corr_matrix = X.corr()
high_corr = set()
for i in range(len(corr_matrix .columns)):
    for j in range(i):
        if abs(corr_matrix.iloc[i, j]) > 0.1:
            colname = corr_matrix.columns[i]
            high_corr.add(colname)
X_reduced.drop(high_corr, axis=1, inplace=True) 

print("Размерность данных после удаления высококоррелированных признаков:", X_reduced.shape)
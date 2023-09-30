import pandas as pd

# Загрузка данных
data = pd.read_csv("data.csv")

# Замена пропущенных значений
data = data.fillna("NA")

# Кодирование категориальных признаков
data_encoded = pd.get_dummies(data)

# Разделение на признаки и целевую переменную
X = data_encoded.drop("Credit amount", axis=1)
y = data_encoded["Credit amount"]

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

# Разделение на обучающую и тестовую выборки
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Построение модели случайного леса
model_full = RandomForestClassifier(random_state=42)
model_full.fit(X_train, y_train)

# Вычисление точности модели на тестовой выборке
y_pred_full = model_full.predict(X_test)
accuracy_full = accuracy_score(y_test, y_pred_full)

print("Точность модели с полным набором параметров:", accuracy_full)


# Удаление некоторых параметров для уменьшенного набора параметров
selected_features = ['Age',  'Job']

# Создание нового датасета с уменьшенным набором параметров
data_reduced = data_encoded[selected_features]

# Разделение на признаки и целевую переменную
X_reduced = data_reduced.drop("Credit amount", axis=1)
y_reduced = data_reduced["Credit amount"]

# Разделение на обучающую и тестовую выборки
X_train_reduced, X_test_reduced, y_train_reduced, y_test_reduced = train_test_split(X_reduced, y_reduced, test_size=0.2, random_state=42)

# Построение модели случайного леса
model_reduced = RandomForestClassifier(random_state=42)
model_reduced.fit(X_train_reduced, y_train_reduced)

# Вычисление точности модели на тестовой выборке
y_pred_reduced = model_reduced.predict(X_test_reduced)
accuracy_reduced = accuracy_score(y_test_reduced, y_pred_reduced)

print("Точность модели с уменьшенным набором параметров:", accuracy_reduced)
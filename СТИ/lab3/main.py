import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score, precision_score, recall_score, confusion_matrix, roc_curve
from sklearn.model_selection import GridSearchCV
import matplotlib.pyplot as plt
from sklearn.datasets import load_diabetes

# Шаг 1: Загрузка и предобработка данных
df=pd.read_csv("lab3/diabetes.csv")

X=df.iloc[:,:8].values
Y=df.iloc[:,-1].values

# Шаг 4: Разделение на обучающую и тестовую выборки
X_train, X_test, y_train, y_test = train_test_split(X, Y, test_size=0.2, random_state=42)

# Шаг 5: Обучение моделей
# Дерево решений
dt_model = DecisionTreeClassifier()
dt_model.fit(X_train, y_train)

# Случайный лес
rf_model = RandomForestClassifier()
rf_model.fit(X_train, y_train)

# k-ближайших соседей
knn_model = KNeighborsClassifier()
knn_model.fit(X_train, y_train)

# SVC
svc_model = SVC()
svc_model.fit(X_train, y_train)

# Шаг 6: Оценка моделей
# Дерево решений
dt_pred = dt_model.predict(X_test)
dt_accuracy = accuracy_score(y_test, dt_pred)
dt_precision = precision_score(y_test, dt_pred)
dt_recall = recall_score(y_test, dt_pred)
dt_cm = confusion_matrix(y_test, dt_pred)
dt_fpr, dt_tpr, _ = roc_curve(y_test, dt_pred)

print("Decision Tree:")
print("Accuracy:", dt_accuracy)
print("Precision:", dt_precision)
print("Recall:", dt_recall)
print("Confusion Matrix:")
print(dt_cm)

# Случайный лес
rf_pred = rf_model.predict(X_test)
rf_accuracy = accuracy_score(y_test, rf_pred)
rf_precision = precision_score(y_test, rf_pred)
rf_recall = recall_score(y_test, rf_pred)
rf_cm = confusion_matrix(y_test, rf_pred)
rf_fpr, rf_tpr, _ = roc_curve(y_test, rf_pred)

print("\nRandom Forest:")
print("Accuracy:", rf_accuracy)
print("Precision:", rf_precision)
print("Recall:", rf_recall)
print("Confusion Matrix:")
print(rf_cm)

# k-ближайших соседей
knn_pred = knn_model.predict(X_test)
knn_accuracy = accuracy_score(y_test, knn_pred)
knn_precision = precision_score(y_test, knn_pred)
knn_recall = recall_score(y_test, knn_pred)
knn_cm = confusion_matrix(y_test, knn_pred)
knn_fpr, knn_tpr, _ = roc_curve(y_test, knn_pred)

print("\nKNN:")
print("Accuracy:", knn_accuracy)
print("Precision:", knn_precision)
print("Recall:", knn_recall)
print("Confusion Matrix:")
print(knn_cm)

# SVC
svc_pred = svc_model.predict(X_test)
svc_accuracy = accuracy_score(y_test, svc_pred)
svc_precision = precision_score(y_test, svc_pred)
svc_recall = recall_score(y_test, svc_pred)
svc_cm = confusion_matrix(y_test, svc_pred)
svc_fpr, svc_tpr, _ = roc_curve(y_test, svc_pred)

print("\nSVC:")
print("Accuracy:", svc_accuracy)
print("Precision:", svc_precision)
print("Recall:", svc_recall)
print("Confusion Matrix:")
print(svc_cm)

# Визуализация ROC-кривых
plt.plot(dt_fpr, dt_tpr, label='Decision Tree')
plt.plot(rf_fpr, rf_tpr, label='Random Forest')
plt.plot(knn_fpr, knn_tpr, label='KNN')
plt.plot(svc_fpr, svc_tpr, label='SVC')
plt.xlabel('False Positive Rate')
plt.ylabel('True Positive Rate')
plt.legend()
plt.show()

# Шаг 7: Улучшение моделей
# Настройка гиперпараметров для дерева решений
dt_params = {'max_depth': [3, 5, 7], 'max_features': ['sqrt', 'log2']}
dt_grid = GridSearchCV(dt_model, dt_params)
dt_grid.fit(X_train, y_train)
best_dt_model = dt_grid.best_estimator_

# Настройка гиперпараметров для случайного леса
rf_params = {'n_estimators': [100, 200, 300], 'max_depth': [5, 10, 15]}
rf_grid = GridSearchCV(rf_model, rf_params)
rf_grid.fit(X_train, y_train)
best_rf_model = rf_grid.best_estimator_

# Настройка гиперпараметров для k-ближайших соседей
knn_params = {'n_neighbors': [3, 5, 7], 'weights': ['uniform', 'distance']}
knn_grid = GridSearchCV(knn_model, knn_params)
knn_grid.fit(X_train, y_train)
best_knn_model = knn_grid.best_estimator_

# Настройка гиперпараметров для SVC
svc_params = {'C': [1, 10, 100], 'gamma': [0.1, 0.01, 0.001]}
svc_grid = GridSearchCV(svc_model, svc_params)
svc_grid.fit(X_train, y_train)
best_svc_model = svc_grid.best_estimator_

# Шаг 9: Выводы
# Приведите выводы о лучшей модели на основе оценок точности и метрик качества.
# Оценка точности улучшенной модели дерева решений
best_dt_pred = best_dt_model.predict(X_test)
best_dt_accuracy = accuracy_score(y_test, best_dt_pred)
best_dt_precision = precision_score(y_test, best_dt_pred)
best_dt_recall = recall_score(y_test, best_dt_pred)
best_dt_cm = confusion_matrix(y_test, best_dt_pred)
dt_fpr, dt_tpr, _ = roc_curve(y_test, best_dt_pred)

print("Best Decision Tree:")
print("Accuracy:", best_dt_accuracy)
print("Precision:", best_dt_precision)
print("Recall:", best_dt_recall)
print("Confusion Matrix:")
print(best_dt_cm)

# Оценка точности улучшенной модели случайного леса
best_rf_pred = best_rf_model.predict(X_test)
best_rf_accuracy = accuracy_score(y_test, best_rf_pred)
best_rf_precision = precision_score(y_test, best_rf_pred)
best_rf_recall = recall_score(y_test, best_rf_pred)
best_rf_cm = confusion_matrix(y_test, best_rf_pred)
rf_fpr, rf_tpr, _ = roc_curve(y_test, best_rf_pred)

print("\nBest Random Forest:")
print("Accuracy:", best_rf_accuracy)
print("Precision:", best_rf_precision)
print("Recall:", best_rf_recall)
print("Confusion Matrix:")
print(best_rf_cm)

# Оценка точности улучшенной модели k-ближайших соседей
best_knn_pred = best_knn_model.predict(X_test)
best_knn_accuracy = accuracy_score(y_test, best_knn_pred)
best_knn_precision = precision_score(y_test, best_knn_pred)
best_knn_recall = recall_score(y_test, best_knn_pred)
best_knn_cm = confusion_matrix(y_test, best_knn_pred)
knn_fpr, knn_tpr, _ = roc_curve(y_test, best_knn_pred)

print("\nBest KNN:")
print("Accuracy:", best_knn_accuracy)
print("Precision:", best_knn_precision)
print("Recall:", best_knn_recall)
print("Confusion Matrix:")
print(best_knn_cm)

# Оценка точности улучшенной модели SVC
best_svc_pred = best_svc_model.predict(X_test)
best_svc_accuracy = accuracy_score(y_test, best_svc_pred)
best_svc_precision = precision_score(y_test, best_svc_pred)
best_svc_recall = recall_score(y_test, best_svc_pred)
best_svc_cm = confusion_matrix(y_test, best_svc_pred)
svc_fpr, svc_tpr, _ = roc_curve(y_test, best_svc_pred)

print("\nBest SVC:")
print("Accuracy:", best_svc_accuracy)
print("Precision:", best_svc_precision)
print("Recall:", best_svc_recall)
print("Confusion Matrix:")
print(best_svc_cm)

# Визуализация ROC-кривых
plt.plot(dt_fpr, dt_tpr, label='Decision Tree')
plt.plot(rf_fpr, rf_tpr, label='Random Forest')
plt.plot(knn_fpr, knn_tpr, label='KNN')
plt.plot(svc_fpr, svc_tpr, label='SVC')
plt.xlabel('False Positive Rate')
plt.ylabel('True Positive Rate')
plt.legend()
plt.show()
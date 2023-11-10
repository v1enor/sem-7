import pandas as pd
import matplotlib.pyplot as plt
from statsmodels.tsa.statespace.sarimax import SARIMAX
from statsmodels.tsa.stattools import adfuller
from statsmodels.graphics.tsaplots import plot_acf, plot_pacf
from statsmodels.tsa.seasonal import seasonal_decompose
# Прочитаем данные из CSV-файла
data = pd.read_csv('lab4/GOOGL_2006-01-01_to_2018-01-01.csv')

# Преобразуем столбец 'Date' в тип данных datetime
data['Date'] = pd.to_datetime(data['Date'])

# Установим столбец 'Date' в качестве индекса
data.set_index('Date', inplace=True)

# Построим график цены закрытия ('Close') по времени
plt.figure(figsize=(12, 6))
plt.plot(data.index, data['Close'], label='Цена закрытия', color='b')
plt.title('График цены закрытия акций Google')
plt.xlabel('Дата')
plt.ylabel('Цена закрытия')
plt.legend()
plt.grid(True)
plt.show()

# Применим декомпозицию временного ряда
result = seasonal_decompose(data['Close'], period=360)  # freq=252 для ежедневных данных

# Построим графики компонентов тренда, сезонности и остатка
plt.figure(figsize=(12, 10))
plt.subplot(4, 1, 1)
plt.plot(result.observed, label='Исходные данные')
plt.legend()

plt.subplot(4, 1, 2)
plt.plot(result.trend, label='Тренд')
plt.legend()

plt.subplot(4, 1, 3)
plt.plot(result.seasonal, label='Сезонность')
plt.legend()

plt.subplot(4, 1, 4)
plt.plot(result.resid, label='Остаток')
plt.legend()

plt.tight_layout()
plt.show()

# Выполним сглаживание ряда с помощью скользящего среднего
window_size = 30  # Размер окна для скользящего среднего (можно настроить)
smoothed_data = data['Close'].rolling(window=window_size).mean()

# Построим график исходных данных и сглаженных данных
plt.figure(figsize=(12, 6))
plt.plot(data.index, data['Close'], label='Исходные данные', color='b')
plt.plot(data.index, smoothed_data, label=f'Сглаженные данные (окно {window_size})', color='r')
plt.title('Сглаживание временного ряда с помощью скользящего среднего')
plt.xlabel('Дата')
plt.ylabel('Цена закрытия')
plt.legend()
plt.grid(True)
plt.show()

# Построим график автокорреляции
plot_acf(data['Close'], lags=500)  # Задайте количество лагов по вашему усмотрению
plt.title('График автокорреляции')
plt.show()

# Выполним тест Дики-Фуллера
result = adfuller(data['Close'])
print('Тест Дики-Фуллера:')
print(f'p-value: {result[1]}')
if result[1] <= 0.05:
    print('Ряд стационарен (p-value <= 0.05)')
else:
    print('Ряд нестационарен (p-value > 0.05)')

# Выполним дифференцирование (разность между текущим и предыдущим значением)
data['Close_diff'] = data['Close'].diff()

# Удалим пропущенные значения, которые появятся после дифференцирования
data.dropna(inplace=True)

# Построим график дифференцированного ряда
plt.figure(figsize=(12, 6))
plt.plot(data.index, data['Close_diff'], label='Дифференцированный ряд', color='b')
plt.title('Дифференцированный временной ряд')
plt.xlabel('Дата')
plt.ylabel('Изменение цены закрытия')
plt.legend()
plt.grid(True)
plt.show()

# Проведем тест Дики-Фуллера после дифференцирования
result = adfuller(data['Close_diff'])
print('Тест Дики-Фуллера после дифференцирования:')
print(f'p-value: {result[1]}')
if result[1] <= 0.05:
    print('Ряд стационарен (p-value <= 0.05)')
else:
    print('Ряд нестационарен (p-value > 0.05)')

# Определите параметры модели SARIMA
p = 1  # Порядок авторегрессии (AR)
d = 1  # Порядок интегрирования (I)
q = 1  # Порядок скользящего среднего (MA)
P = 1  # Порядок сезонной авторегрессии (SAR)
D = 1  # Порядок сезонной интеграции (SI)
Q = 1  # Порядок сезонного скользящего среднего (SMA)
s = 5  # Период сезонности (недельный, 5 дней в неделю)


# Обучим модель SARIMA
model = SARIMAX(data['Close'], order=(p, d, q), seasonal_order=(P, D, Q, s))
results = model.fit(disp=-1)

# Выведем информацию о модели
print(results.summary())

# Построим прогноз
forecast_steps = 30  # Количество шагов для прогнозирования
forecast = results.get_forecast(steps=forecast_steps)

# Интервалы прогноза
forecast_mean = forecast.predicted_mean
forecast_conf_int = forecast.conf_int()

# Рассчитаем остатки модели
residuals = data['Close'] - results.fittedvalues

# Визуализируем остатки
plt.figure(figsize=(12, 6))
plt.plot(residuals, label='Остатки', color='g')
plt.title('Остатки модели SARIMA')
plt.xlabel('Дата')
plt.ylabel('Остатки')
plt.legend()
plt.grid(True)
plt.show()

import pandas as pd
import matplotlib.pyplot as plt
from statsmodels.graphics.tsaplots import plot_acf, plot_pacf

# Загрузка датасета из CSV файла
df = pd.read_csv('DailyDelhiClimateTrain.csv')

# Преобразование столбца 'date' в тип данных datetime
df['date'] = pd.to_datetime(df['date'])

# Установка столбца 'date' в качестве индекса
df.set_index('date', inplace=True)

# Построение графика временного ряда
df['meantemp'].plot()
plt.xlabel('Date')
plt.ylabel('Mean Temperature')
plt.title('Mean Temperature Over Time')
plt.show()

# Оценка автокорреляции и частной автокорреляции
plot_acf(df['meantemp'])
plt.xlabel('Lag')
plt.ylabel('Autocorrelation')
plt.title('Autocorrelation of Mean Temperature')
plt.show()

plot_pacf(df['meantemp'])
plt.xlabel('Lag')
plt.ylabel('Partial Autocorrelation')
plt.title('Partial Autocorrelation of Mean Temperature')
plt.show()





# Преобразование столбца 'date' в тип данных datetime
df['date'] = pd.to_datetime(df['date'], format='%Y-%m-%d')

# Установка столбца 'date' в качестве индекса
df.set_index('date', inplace=True)

# Сглаживание ряда моделью скользящего среднего
window_size = 7  # Размер окна
rolling_mean = df['meantemp'].rolling(window_size).mean()

# Построение графика сглаженного ряда
plt.plot(df['meantemp'], label='Original')
plt.plot(rolling_mean, label='Rolling Mean')
plt.xlabel('Date')
plt.ylabel('Mean Temperature')
plt.title('Mean Temperature with Rolling Mean Smoothing')
plt.legend()
plt.show()
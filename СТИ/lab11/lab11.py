import cv2
import numpy as np

# Загрузите изображение
image = cv2.imread('lab11/water.jpg') # Замените 'your_image.jpg' на путь к вашему изображению
# Укажите желаемые размеры для изменения
desired_width = 800
desired_height = 1000

# Используйте функцию cv2.resize для изменения размера изображения
image = cv2.resize(image, (desired_width, desired_height))
cv2.imshow('Original Image', image)
cv2.waitKey(0)

# Преобразуйте изображение в оттенки серого
gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
gray = cv2.bitwise_not(gray)
cv2.imshow('Grayscale Image', gray)
cv2.waitKey(0)

# Примените пороговую бинаризацию для выделения контуров объектов
_, thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)
cv2.imshow('Thresholded Image', thresh)
cv2.waitKey(0)

# Выполните морфологическое преобразование для удаления шума и заполнения дырок
kernel = np.ones((3, 3), np.uint8)
opening = cv2.morphologyEx(thresh, cv2.MORPH_OPEN, kernel, iterations=2)
cv2.imshow('Morphological Transformation', opening)
cv2.waitKey(0)

# Выполните дилатацию для увеличения размера объектов
sure_bg = cv2.dilate(opening, kernel, iterations=-120)
cv2.imshow('Dilated Image', sure_bg)
cv2.waitKey(0)

# Выполните морфологическое преобразование для поиска маркеров переднего плана
dist_transform = cv2.distanceTransform(opening, cv2.DIST_L2, 5)
_, sure_fg = cv2.threshold(dist_transform, 0.3 * dist_transform.max(), 255, 0)
cv2.imshow('Morphological Transformation for Sure Foreground', sure_fg)
cv2.waitKey(0)

# Вычислите области, которые неизвестны
sure_fg = np.uint8(sure_fg)
unknown = cv2.subtract(sure_bg, sure_fg)
cv2.imshow('Unknown Regions', unknown)
cv2.waitKey(0)

# Присвойте каждой области, которая неизвестна, уникальный маркер
_, markers = cv2.connectedComponents(sure_fg)

# Увеличьте все маркеры на 1, чтобы убедиться, что фон имеет маркер 0
markers = markers + 1
markers[unknown == 255] = 0

# Примените алгоритм водораздела (watershed)
cv2.watershed(image, markers)
image[markers == -1] = [0, 0, 255]  # Пометьте границы водораздела красным цветом
cv2.imshow('Segmented Image', image)
cv2.waitKey(0)

# Преобразуйте изображение маркеров в формат CV_8UC1
markers = np.uint8(markers)

# Найдите контуры объектов
contours, _ = cv2.findContours(markers, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

# Установите размер окна для отображения каждого объекта

# Создайте окно для отображения каждого объекта
for i, contour in enumerate(contours):
    if cv2.contourArea(contour) > 1000:  # Фильтр по минимальной площади
        x, y, w, h = cv2.boundingRect(contour)
        roi = image[y:y + h, x:x + w]

        # Измените размер окна
       
        cv2.imshow(f'Object {i + 1}')
        cv2.waitKey(0)
        cv2.destroyWindow(f'Object {i + 1}')

# Подсчитайте количество объектов (предметов)
num_objects = len(contours)  # Считаем все объекты
print(f'Количество объектов: {num_objects}')

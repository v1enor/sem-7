import cv2
import numpy as np
import matplotlib.pyplot as plt

# Загрузите изображение
image = cv2.imread("lab9/image.jpg", cv2.IMREAD_GRAYSCALE)  # Преобразуем в оттенки серого

# Примените оператор Собеля
sobel_x = cv2.Sobel(image, cv2.CV_64F, 1, 0, ksize=5)  # Горизонтальный оператор
sobel_y = cv2.Sobel(image, cv2.CV_64F, 0, 1, ksize=5)  # Вертикальный оператор

# Примените оператор Лапласа
laplacian = cv2.Laplacian(image, cv2.CV_64F)

# Примените детектор границ Кэнни
canny = cv2.Canny(image, threshold1=60, threshold2=400)  # Подберите параметры по вашим потребностям

# Отобразите изображение и его обработанные версии
plt.figure(figsize=(12, 8))

plt.subplot(2, 3, 1)
plt.imshow(image, cmap='gray')
plt.title("Исходное изображение")

plt.subplot(2, 3, 2)
plt.imshow(np.abs(sobel_x), cmap='gray')
plt.title("Собель X")

plt.subplot(2, 3, 3)
plt.imshow(np.abs(sobel_y), cmap='gray')
plt.title("Собель Y")

plt.subplot(2, 3, 4)
plt.imshow(np.abs(laplacian), cmap='gray')
plt.title("Лапласиан")

plt.subplot(2, 3, 5)
plt.imshow(canny, cmap='gray')
plt.title("Детектор границ Кэнни")

plt.show()

import cv2
import numpy as np
import matplotlib.pyplot as plt

# Загрузите изображение
image = cv2.imread("lab9/image2.jpg")

# Преобразуйте изображение в оттенки серого
gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

# Настройте пороговые значения
threshold_value = 150
max_value = 1200

# Примените бинаризацию с настроенными порогами
_, binary_image = cv2.threshold(gray_image, threshold_value, max_value, cv2.THRESH_BINARY)

# Найдите все контуры на изображении
contours, _ = cv2.findContours(binary_image, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

# Создайте копию изображения для рисования контуров
contour_image = image.copy()

# Нарисуйте прямоугольники, в которые вписаны предметы
min_area_threshold = 100  # Минимальная площадь объекта
min_length_threshold = 20  # Минимальная длина объекта
item_count = 0
for contour in contours:
    area = cv2.contourArea(contour)
    if area > min_area_threshold:
        x, y, w, h = cv2.boundingRect(contour)
        if w > min_length_threshold and h > min_length_threshold:
            cv2.rectangle(contour_image, (x, y), (x + w, y + h), (0, 255, 0), 2)
            item_count +=1
#  Выведите количество предметов

print(f"Количество предметов: {item_count}")

# Найдите контур с наибольшей длиной
max_length_contour = max(contours, key=lambda x: cv2.arcLength(x, True))

# Найдите контур с наибольшей площадью
max_area_contour = max(contours, key=cv2.contourArea)

# Выделите контуры с наибольшей длиной и площадью на изображении
cv2.drawContours(contour_image, [max_length_contour], -1, (255, 0, 0), 2)
cv2.drawContours(contour_image, [max_area_contour], -1, (0, 0, 255), 2)

# Отобразите изображение с контурами
plt.figure(figsize=(12, 8))

plt.subplot(2, 2, 1)
plt.imshow(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))
plt.title("Исходное изображение")

plt.subplot(2, 2, 2)
plt.imshow(binary_image, cmap='gray')
plt.title("Бинарное изображение")

plt.subplot(2, 2, 3)
plt.imshow(cv2.cvtColor(contour_image, cv2.COLOR_BGR2RGB))
plt.title("Изображение с контурами и прямоугольниками")

plt.show()



import cv2
import numpy as np
import matplotlib.pyplot as plt


image = cv2.imread('lab9/sudoku.png')
gray = cv2.cvtColor( image,cv2.COLOR_BGR2GRAY )
edges = cv2.Canny( gray,50,150,apertureSize = 3 )
minLineLength = 100
maxLineGap = 10
lines = cv2.HoughLinesP( edges,0.2,np.pi/180,100,minLineLength=minLineLength,maxLineGap=maxLineGap )
for line in lines:
    for x1,y1,x2,y2 in line:
        cv2.line( image,( x1,y1 ),( x2,y2 ),( 0,255,0 ),2 )

# Загрузите изображение с окружностями
circle_image = cv2.imread("lab9/circle.jpg")

# Преобразуйте изображение в оттенки серого
gray_circle_image = cv2.cvtColor(circle_image, cv2.COLOR_BGR2GRAY)

# Найдите окружности методом Хафа
circles = cv2.HoughCircles(gray_circle_image, cv2.HOUGH_GRADIENT, dp=1, minDist=220, param1=13, param2=90, minRadius=150, maxRadius=230)

if circles is not None:
    circles = np.uint16(np.around(circles))
    for circle in circles[0, :]:
        center = (circle[0], circle[1])
        radius = circle[2]
        cv2.circle(circle_image, center, radius, (0, 0, 255), 2)

# Выведите количество окружностей
if circles is not None:
    circle_count = len(circles[0])
    print(f"Количество окружностей: {circle_count}")
else:
    print("Окружности не обнаружены.")

# Отобразите изображения с обнаруженными линиями и окружностями
plt.figure(figsize=(12, 8))

plt.subplot(2, 2, 1)
plt.imshow(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))
plt.title("Изображение с линиями")

plt.subplot(2, 2, 2)
plt.imshow(cv2.cvtColor(circle_image, cv2.COLOR_BGR2RGB))
plt.title("Изображение с окружностями")

plt.show()

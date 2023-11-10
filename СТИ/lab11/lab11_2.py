import cv2
import numpy as np

# Загрузите изображение
image = cv2.imread('lab11/water.jpg')
desired_width = 800
desired_height = 1000
image = cv2.resize(image, (desired_width, desired_height))


lower_color = np.array([135, 80, 80])
upper_color = np.array([255, 255, 255])



# Примените пороговую бинаризацию для выделения объектов заданного цвета
mask = cv2.inRange(image, lower_color, upper_color)
cv2.imshow('Mask Image', mask)
cv2.waitKey(0)

# Примените морфологическую обработку для улучшения результатов (по желанию)
kernel = np.ones((5, 15), np.uint8)
mask = cv2.morphologyEx(mask, cv2.MORPH_OPEN, kernel)

# Найдите контуры объектов на бинарном изображении
contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

# Рисуйте контуры объектов на исходном изображении
image_with_contours = image.copy()
cv2.drawContours(image_with_contours, contours, -1, (0, 255, 0), 2)

# Отображайте результат
cv2.imshow('Image with Contours', image_with_contours)
cv2.waitKey(0)
cv2.destroyAllWindows()

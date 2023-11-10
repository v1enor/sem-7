import cv2
import numpy as np
import matplotlib.pyplot as plt

# 1. Загрузка заданного изображения
image = cv2.imread("lab8\cat.jpg")

# 2. Преобразование изображения в оттенки серого (одноканальное)
gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

# 3. Пороговая бинаризация
_, binary_image = cv2.threshold(gray_image, 128, 255, cv2.THRESH_BINARY)

# 4. Адаптивная бинаризация
adaptive_binary_image = cv2.adaptiveThreshold(
    gray_image, 255, cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY, 11, 2)

# Отображение изображений
cv2.imshow("Original Image", image)
cv2.imshow("Grayscale Image", gray_image)
cv2.imshow("Binary Image", binary_image)
cv2.imshow("Adaptive Binary Image", adaptive_binary_image)

cv2.waitKey(0)
cv2.destroyAllWindows()

# Загрузите изображение
image = cv2.imread("lab8/black_cat.jpg")
# Разделите изображение на каналы цвета
b, g, r = cv2.split(image)

# Выровняйте освещенность для каждого канала
equalized_b = cv2.equalizeHist(b)
equalized_g = cv2.equalizeHist(g)
equalized_r = cv2.equalizeHist(r)

# Объедините выровненные каналы цвета обратно в изображение
equalized_image = cv2.merge((equalized_b, equalized_g, equalized_r))

# Постройте гистограмму изображения до выравнивания
hist_original_b = cv2.calcHist([b], [0], None, [256], [0, 256])
hist_original_g = cv2.calcHist([g], [0], None, [256], [0, 256])
hist_original_r = cv2.calcHist([r], [0], None, [256], [0, 256])

# Постройте гистограмму изображения после выравнивания
hist_equalized_b = cv2.calcHist([equalized_b], [0], None, [256], [0, 256])
hist_equalized_g = cv2.calcHist([equalized_g], [0], None, [256], [0, 256])
hist_equalized_r = cv2.calcHist([equalized_r], [0], None, [256], [0, 256])

# Отобразите изображение и гистограммы
plt.figure(figsize=(12, 8))

plt.subplot(2, 2, 1)
plt.imshow(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))
plt.title("Исходное изображение")

plt.subplot(2, 2, 2)
plt.imshow(cv2.cvtColor(equalized_image, cv2.COLOR_BGR2RGB))
plt.title("Выровненное изображение")

plt.subplot(2, 2, 3)
plt.plot(hist_original_b, color='blue')
plt.plot(hist_original_g, color='green')
plt.plot(hist_original_r, color='red')
plt.title("Гистограмма исходного изображения")

plt.subplot(2, 2, 4)
plt.plot(hist_equalized_b, color='blue')
plt.plot(hist_equalized_g, color='green')
plt.plot(hist_equalized_r, color='red')
plt.title("Гистограмма выровненного изображения")
plt.show()

# Загрузите изображение
image = cv2.imread("lab8/bad_cat.jpg")

# Примените размытие (blur)
blurred_image = cv2.blur(image, (5, 5))

# Примените гауссовское размытие (GaussianBlur)
gaussian_blurred_image = cv2.GaussianBlur(image, (5, 5), 0)

# Примените медианное размытие (medianBlur)
median_blurred_image = cv2.medianBlur(image, 5)

# Отобразите исходное и размытые изображения
plt.figure(figsize=(12, 4))

plt.subplot(1, 4, 1)
plt.imshow(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))
plt.title("Исходное изображение")

plt.subplot(1, 4, 2)
plt.imshow(cv2.cvtColor(blurred_image, cv2.COLOR_BGR2RGB))
plt.title("Размытое изображение (blur)")

plt.subplot(1, 4, 3)
plt.imshow(cv2.cvtColor(gaussian_blurred_image, cv2.COLOR_BGR2RGB))
plt.title("Гауссовское размытое изображение (GaussianBlur)")

plt.subplot(1, 4, 4)
plt.imshow(cv2.cvtColor(median_blurred_image, cv2.COLOR_BGR2RGB))
plt.title("Медианное размытое изображение (medianBlur)")

plt.show()



# Загрузите изображение
image = cv2.imread("lab8/solid_cat.jpg")

# Преобразуйте изображение в оттенки серого
gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

# Преобразуйте изображение в бинарное с использованием пороговой бинаризации
_, binary_image = cv2.threshold(gray_image, 128, 255, cv2.THRESH_BINARY)

# Создайте ядро для операций эрозии и дилатации
kernel = np.ones((5, 5), np.uint8)

# Примените операцию эрозии
eroded_image = cv2.erode(binary_image, kernel, iterations=1)

# Примените операцию дилатации
dilated_image = cv2.dilate(binary_image, kernel, iterations=1)

# Отобразите исходное бинарное изображение, эрозию и дилатацию
plt.figure(figsize=(12, 4))

plt.subplot(1, 3, 1)
plt.imshow(binary_image, cmap='gray')
plt.title("Бинарное изображение")

plt.subplot(1, 3, 2)
plt.imshow(eroded_image, cmap='gray')
plt.title("Эрозия")

plt.subplot(1, 3, 3)
plt.imshow(dilated_image, cmap='gray')
plt.title("Дилатация")

plt.show()
import cv2
import numpy as np

# Загрузите изображение
image = cv2.imread('lab10/angles.jpg', 0)  # Замените 'your_image.jpg' на путь к вашему изображению

# Параметры детекторов углов
harris_block_size = 2  # Размер блока для детектора Харриса
harris_ksize = 3  # Размер я
harris_k = 0.4  # Параметр k для детектора Харриса
shi_tomasi_max_corners = 100  # Максимальное количество точек для детектора Ши-Томаси
shi_tomasi_quality_level = 0.1  # Порог качества для детектора Ши-Томаси
shi_tomasi_min_distance = 10  # Минимальное расстояние между точками для детектора Ши-Томаси

# Детекция углов с использованием детектора Харриса
harris_corners = cv2.cornerHarris(image, blockSize=harris_block_size, ksize=harris_ksize, k=harris_k)
harris_corners = cv2.dilate(harris_corners, None)  # Увеличиваем найденные углы

# Детекция углов с использованием детектора Ши-Томаси
shi_tomasi_corners = cv2.goodFeaturesToTrack(image, maxCorners=shi_tomasi_max_corners,
                                             qualityLevel=shi_tomasi_quality_level,
                                             minDistance=shi_tomasi_min_distance)

# Отмечаем угловые точки на изображении
harris_image = image.copy()
harris_image[harris_corners > 0.01 * harris_corners.max()] = 255  # Подсвечиваем угловые точки

shi_tomasi_image = image.copy()
shi_tomasi_corners = np.int0(shi_tomasi_corners)
for corner in shi_tomasi_corners:
    x, y = corner.ravel()
    cv2.circle(shi_tomasi_image, (x, y), 3, 255, -1)  # Рисуем круги вокруг угловых точек

# Вывод изображений
cv2.imshow('Harris Corners', harris_image)
cv2.imshow('Shi-Tomasi Corners', shi_tomasi_image)
cv2.waitKey(0)
cv2.destroyAllWindows()


import cv2

# Загрузите фотографию с лицами
image = cv2.imread('lab10/faces.jpg') 

# Создайте каскады Хаара для детекции лиц, глаз и улыбок
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
eye_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_eye.xml')
smile_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_smile.xml')

# Преобразуйте изображение в оттенки серого для детекции
gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

# Детекция лиц
faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=3, minSize=(30, 30))

# Для каждого обнаруженного лица, детектируйте глаза и улыбки
for (x, y, w, h) in faces:
    cv2.rectangle(image, (x, y), (x + w, y + h), (255, 0, 0), 2)
    roi_gray = gray[y:y + h, x:x + w]
    roi_color = image[y:y + h, x:x + w]

    # Детекция глаз
    eyes = eye_cascade.detectMultiScale(roi_gray, scaleFactor=1.1,minNeighbors=20, minSize=(20,20),maxSize=(50,50))
    for (ex, ey, ew, eh) in eyes:
        cv2.rectangle(roi_color, (ex, ey), (ex + ew, ey + eh), (0, 255, 0), 2)

    # Детекция улыбок
    smiles = smile_cascade.detectMultiScale(roi_gray, scaleFactor=1.2, minNeighbors=25, minSize=(25, 25))
    for (sx, sy, sw, sh) in smiles:
        cv2.rectangle(roi_color, (sx, sy), (sx + sw, sy + sh), (0, 0, 255), 2)

# Вывод изображения с отмеченными лицами, глазами и улыбками
cv2.imshow('Detected Faces, Eyes, and Smiles', image)
cv2.waitKey(0)
cv2.destroyAllWindows()

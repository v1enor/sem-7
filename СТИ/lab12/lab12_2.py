import cv2
import numpy as np

# Инициализируйте объект захвата видео с камеры
cap = cv2.VideoCapture(0)

# Инициализируйте пустой массив для хранения начальных точек
points_to_track = None
prev_gray = None

while True:
    ret, frame = cap.read()
    if not ret:
        break

    # Преобразуйте текущий кадр в оттенки серого
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    if prev_gray is None:
        prev_gray = gray

    if points_to_track is None:
        # Если у нас еще нет начальных точек, найдем их на текущем кадре
        corners = cv2.goodFeaturesToTrack(gray, maxCorners=500, qualityLevel=0.1, minDistance=10)
        if corners is not None:
            points_to_track = corners

    if points_to_track is not None and len(points_to_track) > 0:
        # Выполните оптический поток
        new_points, status, _ = cv2.calcOpticalFlowPyrLK(prev_gray, gray, points_to_track, None)

        # Отфильтруйте точки, которые потерялись или имеют плохой статус
        good_new = new_points[status == 1]
        good_old = points_to_track[status == 1]

        # Нарисуйте траекторию движения
        for i, (new, old) in enumerate(zip(good_new, good_old)):
            a, b = new.ravel()
            c, d = old.ravel()
            frame = cv2.line(frame, (int(a), int(b)), (int(c), int(d)), (0, 0, 255), 2)
            frame = cv2.circle(frame, (int(a), int(b)), 5, (0, 0, 255), -1)

    # Обновите начальные точки для следующего кадра
    points_to_track = good_new.reshape(-1, 1, 2)

    # Обновите предыдущий кадр (prev_gray)
    prev_gray = gray

    # Отобразите кадр
    cv2.imshow("Optical Flow", frame)

    # Для завершения видеопотока, нажмите клавишу 'q'
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Освобождение ресурсов и закрытие окна с видео
cap.release()
cv2.destroyAllWindows()

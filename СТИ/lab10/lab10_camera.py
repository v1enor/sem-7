import cv2


path = cv2.data.haarcascades

# Создайте каскады Хаара для детекции лиц, глаз и носа
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
eye_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_eye.xml')
nose_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_mcs_nose.xml')

# Запустите видеопоток с камеры
cap = cv2.VideoCapture(0)  # Используйте 0 для встроенной камеры, либо указав путь к видеофайлу

while True:
    # Захват кадра из видеопотока
    ret, frame = cap.read()

    # Преобразуйте кадр в оттенки серого для детекции
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    # Детекция лиц
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.4, minNeighbors=3, minSize=(50, 50))

    for (x, y, w, h) in faces:
        cv2.rectangle(frame, (x, y), (x + w, y + h), (255, 0, 0), 2)

        # Регион интереса (ROI) для детекции глаз и носа внутри лица
        roi_gray = gray[y:y + h, x:x + w]
        roi_color = frame[y:y + h, x:x + w]

        # Детекция глаз
        eyes = eye_cascade.detectMultiScale(roi_gray)
        for (ex, ey, ew, eh) in eyes:
            cv2.rectangle(roi_color, (ex, ey), (ex + ew, ey + eh), (0, 255, 0), 2)

        # Детекция носа
        noses = nose_cascade.detectMultiScale(roi_gray)
        for (nx, ny, nw, nh) in noses:
            cv2.rectangle(roi_color, (nx, ny), (nx + nw, ny + nh), (0, 0, 255), 2)

    # Вывод кадра с отмеченными лицами, глазами и носами
    cv2.imshow('Video', frame)

    # Для завершения видеопотока, нажмите клавишу 'q'
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Освобождение ресурсов и закрытие окна с видео
cap.release()
cv2.destroyAllWindows()

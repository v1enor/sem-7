import cv2

while True:
    # Захват кадра из видеопотока
    ret, frame = cap.read()

    if not ret:
        break

    # Примените метод вычития фона
    fgmask = fgbg.apply(frame)

    # Примените морфологическую обработку для улучшения результатов (по желанию)
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (15, 15))
    fgmask = cv2.morphologyEx(fgmask, cv2.MORPH_OPEN, kernel)

    # Найдите контуры движущихся объектов
    contours, _ = cv2.findContours(fgmask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    # Определите условие для обнаружения движения (например, если есть контуры)
    if len(contours) > 0:
        motion_detected = True
    else:
        motion_detected = False

    # Реагируйте на обнаружение движения
    if motion_detected:
        # Здесь вы можете выполнить действие в ответ на обнаружение движения, например, вывести сообщение или отправить сигнал
        print("Движение обнаружено!")

    # Вывод кадра с вычитым фоном и контурами
    cv2.imshow('Motion Detection', frame)

    # Для завершения видеопотока, нажмите клавишу 'q'
    if cv2.waitKey(30) & 0xFF == ord('q'):
        break

# Освобождение ресурсов и закрытие окна с видео
cap.release()
cv2.destroyAllWindows()

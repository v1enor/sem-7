import cv2
import mediapipe as mp

mp_hands = mp.solutions.hands
hands = mp_hands.Hands()

# Load the overlay image: replace 'overlay.png' with your image path
overlay = cv2.imread("lab13/water.jpg")
# Resize the image to fit the video frame
overlay = cv2.resize(overlay, (20, 20))  # Smaller size for finger tips

# Create a VideoCapture object
cap = cv2.VideoCapture(0)

if not cap.isOpened():
    print("Cannot open camera")
    exit()

while True:
    success, image = cap.read()
    if not success:
        print("Can't receive frame (stream end?). Exiting ...")
        break

    # pass by reference.
    image.flags.writeable = False
    results = hands.process(image)

    # Draw the hand annotations on the image.
    image.flags.writeable = True
    if results.multi_hand_landmarks:
        for hand_landmarks in results.multi_hand_landmarks:
            # Get the coordinates of the tip of each finger
            for finger in [mp_hands.HandLandmark.THUMB_TIP, mp_hands.HandLandmark.INDEX_FINGER_TIP, mp_hands.HandLandmark.MIDDLE_FINGER_TIP, mp_hands.HandLandmark.RING_FINGER_TIP, mp_hands.HandLandmark.PINKY_TIP]:
                x = int(hand_landmarks.landmark[finger].x * image.shape[1])
                y = int(hand_landmarks.landmark[finger].y * image.shape[0])
                
                # Get the height and width of the overlay
                h, w = overlay.shape[:2]

                # Ensure y and x are within the bounds that can accommodate the overlay
                y = min(y, image.shape[0] - h)
                x = min(x, image.shape[1] - w)

                # Check if there's enough space to place the overlay
                if x >= 0 and y >= 0 and x + w <= image.shape[1] and y + h <= image.shape[0]:
                    # Overlay the image at the tip of the index finger
                    image[y:y+h, x:x+w] = overlay

    cv2.imshow('MediaPipe Hands', image)
    if cv2.waitKey(5) & 0xFF == 27:
        break

cap.release()
cv2.destroyAllWindows()
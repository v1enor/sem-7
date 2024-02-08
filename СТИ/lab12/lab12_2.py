import cv2
import numpy as np

# Initialize the video capture object from the camera
cap = cv2.VideoCapture(0)

# Initialize an empty array to store the initial points
points_to_track = None
prev_gray = None

while True:
    ret, frame = cap.read()
    if not ret:
        break

    # Convert the current frame to grayscale
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    if prev_gray is None:
        prev_gray = gray

    if points_to_track is None or len(points_to_track) < 1:
        corners = cv2.goodFeaturesToTrack(gray, maxCorners=500, qualityLevel=0.1, minDistance=10)
        points_to_track = corners

    if points_to_track is not None and len(points_to_track) > 0:
        # Perform optical flow
        new_points, status, _ = cv2.calcOpticalFlowPyrLK(prev_gray, gray, points_to_track, None)

        # Filter out points that were lost or have bad status
        good_new = new_points[status == 1]
        good_old = points_to_track[status == 1]

        # Draw the motion trajectory
        for i, (new, old) in enumerate(zip(good_new, good_old)):
            a, b = new.ravel()
            c, d = old.ravel()
            frame = cv2.line(frame, (int(a), int(b)), (int(c), int(d)), (0, 0, 255), 2)
            frame = cv2.circle(frame, (int(a), int(b)), 5, (0, 0, 255), -1)

        # Update the initial points for the next frame
        points_to_track = good_new.reshape(-1, 1, 2)

    # Update the previous frame (prev_gray)
    prev_gray = gray

    # Display the frame
    cv2.imshow("Optical Flow", frame)

    # To end the video stream, press the 'q' key
    if cv2.waitKey(30) & 0xFF == ord('q'):  # Increased delay to 30 milliseconds
        break

# Release resources and close the video window
cap.release()
cv2.destroyAllWindows()
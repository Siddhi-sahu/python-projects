# Weapon Detection System

A real-time gun detection application that uses your webcam to identify weapons in a live video feed. This project leverages computer vision techniques and a pre-trained cascade classifier to detect firearms and alert you when threats are present.

## Features

- **Real-time Detection**: Analyzes your webcam feed in real-time to detect guns
- **Visual Feedback**: Draws blue rectangles around detected weapons in the video


The application will:
1. Open your webcam and display a live security feed
2. Continuously scan for weapons in the video stream
3. Highlight any detected guns with blue rectangles
4. Show the feed in a window titled "Security Feed"

**To exit:** Press the **'q'** key while the video window is active

## 💡 How It Works

The system uses a **Cascade Classifier**, a machine learning model pre-trained to recognize guns. It:
1. Captures frames from your webcam
2. Converts frames to grayscale for faster processing
3. Scans each frame for patterns matching weapons
4. Draws rectangles around detected objects
5. Tracks whether any weapons were detected during the entire session


## 🔧 Customization

You can tweak detection sensitivity by adjusting parameters in `gun_detection.py`:
- **1.3** - Scale factor (higher = more thorough but slower)
- **5** - Min neighbors (higher = stricter, fewer false positives)
- **minSize=(100, 100)** - Minimum weapon size to detect


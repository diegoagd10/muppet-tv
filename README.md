# Muppet TV

I built this React Native application for my kids to allow them to watch videos while ensuring a safe and controlled viewing experience. The app allows users to play videos and provides a navigation experience for seamless video playback. It also suggests videos based on the least viewed content, ensuring a diverse and engaging selection for users.

## Demo

### Smartphone (Pixel 4a)

<iframe src="https://player.vimeo.com/video/834604398" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>

### Tablet (Nexus 10)

<iframe src="https://player.vimeo.com/video/834604578" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>

## Features

- Video playback using the YouTube iframe player
- Fetching and displaying video lists
- Handling errors and retries
- Integration with Firebase to retrieve video IDs and increment view counts
- Integration with the YouTube Data API for fetching video details
- Responsive design for different screen sizes and orientations

## Prerequisites

Before running the application, make sure you have the following prerequisites:

- Node.js installed on your machine
- NPM installed on your machine
- React Native development environment set up

## Code Structure

The application code is organized into several directories:

- `api`: Contains API functions for fetching data from Firebase and the YouTube Data API.
- `components`: Contains reusable components used throughout the application.
- `models`: Contains TypeScript interfaces and models used for data structures.
- `navigation`: Contains navigation components.
- `service`: Contains service components for fetching data from APIs.
- `screens`: Contains screen components.
- `utils`: Contains utility functions and configuration files.

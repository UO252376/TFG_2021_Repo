// VIDEO STREAMING
const express = require('express');
const videoApp = express();
videoApp.listen(1338, () => console.log('listening on port ${port}!'));

videoStream.acceptConnections(videoApp, {
    width: 1280,
    height: 720,
    fps: 16,
    encoding: 'JPEG',
    quality: 7
}, '/stream.mjpg', true);
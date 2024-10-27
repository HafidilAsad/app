import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

const VideoStream = () => {
    const videoRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;
        const hls = new Hls();
        
        hls.loadSource('ws://solusiprogrammer.my.id/ws'); // Ganti dengan URL WebSocket yang sesuai
        hls.attachMedia(video);
        
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
            video.play();
        });

        return () => {
            hls.destroy();
        };
    }, []);

    return <video ref={videoRef} controls autoPlay />;
};

export default VideoStream;

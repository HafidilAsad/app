// src/JsmpegPlayer.js
import React, { useEffect, useRef } from 'react';
import jsmpeg from 'jsmpeg';

const JsmpegPlayer = ({ videoSource }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const client = new WebSocket(videoSource); // Use WebSocket for streaming
        
        const player = new jsmpeg(client, { canvas: canvas });

        return () => {
            player.pause(); // Clean up on unmount
        };
    }, [videoSource]);

    return <canvas ref={canvasRef} width="640" height="480" />;
};

export default JsmpegPlayer;
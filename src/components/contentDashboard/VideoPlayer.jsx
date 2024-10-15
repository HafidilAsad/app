// VideoPlayer.js
import React, { useEffect } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

const VideoPlayer = ({ streamUrl }) => {
  const videoRef = React.useRef(null);

  useEffect(() => {
    const player = videojs(videoRef.current, {
      controls: true,
      autoplay: true,
      preload: 'auto',
    });

    player.src({ src: streamUrl, type: 'application/x-mpegURL' });

    return () => {
      if (player) {
        player.dispose();
      }
    };
  }, [streamUrl]);

  return (
    <div>
      <div data-vjs-player>
        <video ref={videoRef} className="video-js vjs-big-play-centered" />
      </div>
    </div>
  );
};

export default VideoPlayer;

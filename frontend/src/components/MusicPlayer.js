import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Maximize2, Minimize2, ExternalLink } from 'lucide-react';

const MusicPlayer = ({ currentSong, isPlaying, onPlayPause, onNext, onPrevious, onVolumeChange }) => {
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [audioUrl, setAudioUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (currentSong) {
      // Generate different demo audio based on song mood/genre
      let demoUrl;
      if (currentSong.mood === 'Happy' || currentSong.genre === 'Pop') {
        demoUrl = 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav';
      } else if (currentSong.mood === 'Epic' || currentSong.genre === 'Rock') {
        demoUrl = 'https://www.soundjay.com/misc/sounds/drum-roll-1.wav';
      } else if (currentSong.mood === 'Romantic') {
        demoUrl = 'https://www.soundjay.com/misc/sounds/piano-1.wav';
      } else {
        demoUrl = 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav';
      }
      setAudioUrl(demoUrl);
    }
  }, [currentSong]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play().catch(err => {
        console.log('Audio play failed:', err);
        // Fallback to demo mode
        onPlayPause(); // Call the parent's play/pause function
      });
    } else if (!isPlaying && audioRef.current) {
      audioRef.current.pause();
    }
  }, [isPlaying, onPlayPause]);

  useEffect(() => {
    if (audioRef.current) {
      const updateProgress = () => {
        if (audioRef.current.duration) {
          const progressPercent = (audioRef.current.currentTime / audioRef.current.duration) * 100;
          setProgress(progressPercent);
        }
      };

      audioRef.current.addEventListener('timeupdate', updateProgress);
      audioRef.current.addEventListener('ended', () => {
        onPlayPause(); // Call the parent's play/pause function
        setProgress(0);
      });

      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener('timeupdate', updateProgress);
          audioRef.current.removeEventListener('ended', () => {
            onPlayPause();
            setProgress(0);
          });
        }
      };
    }
  }, [onPlayPause]);

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
    if (onVolumeChange) {
      onVolumeChange(newVolume);
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      setVolume(0.7);
      setIsMuted(false);
      if (onVolumeChange) {
        onVolumeChange(0.7);
      }
    } else {
      setVolume(0);
      setIsMuted(true);
      if (onVolumeChange) {
        onVolumeChange(0);
      }
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getCurrentTime = () => {
    if (audioRef.current) {
      return formatTime(audioRef.current.currentTime || 0);
    }
    return '0:00';
  };

  const getDuration = () => {
    if (audioRef.current && audioRef.current.duration) {
      return formatTime(audioRef.current.duration);
    }
    return '0:00';
  };

  const handleProgressClick = (e) => {
    if (audioRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      const clickPercent = clickX / width;
      const newTime = clickPercent * audioRef.current.duration;
      audioRef.current.currentTime = newTime;
    }
  };

  if (!currentSong) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className={`fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 z-50 ${
          isFullscreen ? 'h-screen' : 'h-20'
        }`}
      >
        {/* Hidden audio element */}
        {audioUrl && (
          <audio
            ref={audioRef}
            src={audioUrl}
            preload="metadata"
            onLoadStart={() => setIsLoading(true)}
            onCanPlay={() => setIsLoading(false)}
            onError={() => setIsLoading(false)}
          />
        )}
        <div className="max-w-6xl mx-auto px-4 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Song Info */}
            <div className="flex items-center space-x-4 flex-1">
              <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                <motion.div
                  animate={{ rotate: isPlaying ? 360 : 0 }}
                  transition={{ duration: 3, repeat: isPlaying ? Infinity : 0, ease: "linear" }}
                >
                  🎵
                </motion.div>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-white font-medium truncate">{currentSong.track_name}</h4>
                <p className="text-gray-400 text-sm truncate">{currentSong.artist_name}</p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onPrevious}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <SkipBack className="h-5 w-5" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onPlayPause}
                disabled={isLoading}
                className="w-12 h-12 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white hover:shadow-lg transition-all duration-200 disabled:opacity-50"
              >
                {isLoading ? (
                  <motion.div
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                ) : isPlaying ? (
                  <Pause className="h-6 w-6" />
                ) : (
                  <Play className="h-6 w-6" />
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onNext}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <SkipForward className="h-5 w-5" />
              </motion.button>
            </div>

            {/* Progress and Volume */}
            <div className="flex items-center space-x-4 flex-1 justify-end">
              {/* Progress Bar */}
              <div className="flex items-center space-x-2 flex-1 max-w-md">
                <span className="text-xs text-gray-400 w-10">{getCurrentTime()}</span>
                <div 
                  className="flex-1 bg-gray-700 rounded-full h-1 cursor-pointer"
                  onClick={handleProgressClick}
                >
                  <motion.div
                    className="bg-gradient-to-r from-primary-500 to-accent-500 h-1 rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className="text-xs text-gray-400 w-10">{getDuration()}</span>
              </div>

              {/* Volume Control */}
              <div className="flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleMute}
                  className="p-1 text-gray-400 hover:text-white transition-colors"
                >
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </motion.button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                  className="w-20 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>

              {/* Listen on Spotify */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  const searchQuery = encodeURIComponent(`${currentSong.track_name} ${currentSong.artist_name}`);
                  window.open(`https://open.spotify.com/search/${searchQuery}`, '_blank');
                }}
                className="p-2 text-green-400 hover:text-green-300 transition-colors"
                title="Listen on Spotify"
              >
                <ExternalLink className="h-4 w-4" />
              </motion.button>

              {/* Fullscreen Toggle */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Fullscreen View */}
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-gray-900 flex items-center justify-center"
          >
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center mb-8">
                <motion.div
                  animate={{ rotate: isPlaying ? 360 : 0 }}
                  transition={{ duration: 3, repeat: isPlaying ? Infinity : 0, ease: "linear" }}
                  className="text-4xl"
                >
                  🎵
                </motion.div>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">{currentSong.track_name}</h2>
              <p className="text-gray-400 text-lg">{currentSong.artist_name}</p>
              <div className="mt-4">
                <span className="px-3 py-1 bg-primary-600 text-white rounded-full text-sm">
                  {currentSong.genre}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default MusicPlayer; 
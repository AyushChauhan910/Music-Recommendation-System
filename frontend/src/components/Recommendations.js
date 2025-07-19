import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Music, User, Calendar, Play, Sparkles, TrendingUp } from 'lucide-react';
import axios from 'axios';

const Recommendations = () => {
  const [songTitle, setSongTitle] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [querySong, setQuerySong] = useState('');

  const getRecommendations = async (songToSearch = null) => {
    const searchTitle = songToSearch || songTitle;
    
    if (!searchTitle.trim()) {
      setError('Please enter a song title');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post('/api/recommendations', {
        song_title: searchTitle,
        top_n: 10
      });

      if (response.data.error) {
        setError(response.data.error);
        setRecommendations([]);
      } else {
        setRecommendations(response.data.recommendations || []);
        setQuerySong(response.data.query_song);
      }
    } catch (err) {
      setError('Failed to get recommendations. Please try again.');
      setRecommendations([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getRecommendations();
  };

  const getGenreColor = (genre) => {
    const colors = {
      'Rock': 'bg-red-500',
      'Pop': 'bg-pink-500',
      'Jazz': 'bg-purple-500',
      'Classical': 'bg-blue-500',
      'Hip Hop': 'bg-green-500',
      'Country': 'bg-yellow-500',
      'Electronic': 'bg-cyan-500',
      'Blues': 'bg-indigo-500',
      'Folk': 'bg-orange-500',
      'Soul': 'bg-rose-500',
      'Folk Rock': 'bg-orange-500',
      'Grunge': 'bg-gray-500',
      'Bollywood': 'bg-purple-500',
      'Punjabi Pop': 'bg-orange-500',
    };
    return colors[genre] || 'bg-gray-500';
  };

  const exampleSongs = {
    English: [
      { title: 'Bohemian Rhapsody', artist: 'Queen' },
      { title: 'Hotel California', artist: 'Eagles' },
      { title: 'Imagine', artist: 'John Lennon' },
      { title: 'Stairway to Heaven', artist: 'Led Zeppelin' }
    ],
    Hindi: [
      { title: 'Tum Hi Ho', artist: 'Arijit Singh' },
      { title: 'Chaiyya Chaiyya', artist: 'A.R. Rahman' },
      { title: 'Kal Ho Naa Ho', artist: 'Sonu Nigam' },
      { title: 'Tere Sang Yaara', artist: 'Atif Aslam' }
    ],
    Punjabi: [
      { title: 'Laung Laachi', artist: 'Mannat Noor' },
      { title: 'Patiala Peg', artist: 'Diljit Dosanjh' },
      { title: 'Jatt & Juliet', artist: 'Diljit Dosanjh' },
      { title: 'G.O.A.T.', artist: 'Diljit Dosanjh' }
    ]
  };

  const handleExampleClick = (songTitle) => {
    setSongTitle(songTitle);
    // Auto-submit after a short delay
    setTimeout(() => {
      getRecommendations(songTitle);
    }, 100);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-white mb-4">
          Get <span className="gradient-text">Recommendations</span>
        </h1>
        <p className="text-gray-400 text-lg">
          Enter a song you love and discover similar music
        </p>
      </motion.div>

      {/* Input Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-8"
      >
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
          <div className="flex gap-4">
            <div className="flex-1">
              <input
                type="text"
                value={songTitle}
                onChange={(e) => setSongTitle(e.target.value)}
                placeholder="Enter a song title..."
                className="w-full px-4 py-4 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={loading}
              className="px-8 py-4 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {loading ? (
                <>
                  <motion.div
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  <span>Finding...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  <span>Get Recommendations</span>
                </>
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>

      {/* Example Songs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-8"
      >
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold text-white mb-2">Try these popular songs</h3>
          <p className="text-gray-400">Click any song to get recommendations</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {Object.entries(exampleSongs).map(([language, songs]) => (
            <motion.div
              key={language}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="glass rounded-xl p-6"
            >
              <div className="text-center mb-4">
                <h4 className="text-lg font-semibold text-white mb-2">{language}</h4>
                <div className="w-12 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded"></div>
              </div>
              
              <div className="space-y-3">
                {songs.map((song, index) => (
                  <motion.button
                    key={song.title}
                    onClick={() => handleExampleClick(song.title)}
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full text-left p-3 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-200 group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h5 className="text-white font-medium group-hover:text-primary-400 transition-colors">
                          {song.title}
                        </h5>
                        <p className="text-sm text-gray-400">{song.artist}</p>
                      </div>
                      <Play className="h-4 w-4 text-gray-400 group-hover:text-primary-400 transition-colors" />
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-center mb-6"
          >
            <div className="inline-flex items-center space-x-2 bg-red-500/20 border border-red-500/50 text-red-400 px-4 py-2 rounded-lg">
              <span>{error}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Query Song Display */}
      <AnimatePresence>
        {querySong && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center mb-8"
          >
            <div className="glass rounded-xl p-6 max-w-md mx-auto">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Heart className="h-5 w-5 text-accent-400" />
                <span className="text-sm text-gray-400">Based on your love for</span>
              </div>
              <h3 className="text-xl font-semibold text-white">{querySong}</h3>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Recommendations */}
      <AnimatePresence>
        {recommendations.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <TrendingUp className="h-6 w-6 text-primary-400" />
                <h2 className="text-2xl font-semibold text-white">
                  Recommended for You
                </h2>
              </div>
              <p className="text-gray-400">
                Here are {recommendations.length} songs you might love
              </p>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid gap-4"
            >
              {recommendations.map((song, index) => (
                <motion.div
                  key={`${song.track_name}-${song.artist_name}-${index}`}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="glass rounded-xl p-6 hover:shadow-xl transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                          <Music className="h-6 w-6 text-white" />
                        </div>
                        <motion.div
                          className="absolute -top-1 -right-1 h-4 w-4 bg-accent-500 rounded-full flex items-center justify-center"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: index * 0.1 + 0.5 }}
                        >
                          <span className="text-xs text-white font-bold">{index + 1}</span>
                        </motion.div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white mb-1">
                          {song.track_name}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <div className="flex items-center space-x-1">
                            <User className="h-4 w-4" />
                            <span>{song.artist_name}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{song.year}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getGenreColor(song.genre)}`}>
                        {song.genre}
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors"
                      >
                        <Play className="h-5 w-5 text-white" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty State */}
      <AnimatePresence>
        {!songTitle && !loading && recommendations.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center py-12"
          >
            <div className="glass rounded-xl p-8 max-w-md mx-auto">
              <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Start discovering</h3>
              <p className="text-gray-400">
                Enter a song you love to get personalized recommendations
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Recommendations; 
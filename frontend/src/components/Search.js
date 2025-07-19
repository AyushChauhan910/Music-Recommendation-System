import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search as SearchIcon, Music, User, Calendar, Play } from 'lucide-react';
import axios from 'axios';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const searchSongs = async (searchQuery) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.get(`/api/search?q=${encodeURIComponent(searchQuery)}`);
      setResults(response.data.results || []);
    } catch (err) {
      setError('Failed to search songs. Please try again.');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query) {
        searchSongs(query);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
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
    };
    return colors[genre] || 'bg-gray-500';
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
          Search <span className="gradient-text">Music</span>
        </h1>
        <p className="text-gray-400 text-lg">
          Find your favorite songs and discover new artists
        </p>
      </motion.div>

      {/* Search Input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-8"
      >
        <div className="relative max-w-2xl mx-auto">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <SearchIcon className="h-6 w-6 text-gray-400" />
          </div>
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Search for songs, artists, or genres..."
            className="w-full pl-12 pr-4 py-4 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
          />
          {loading && (
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
              <motion.div
                className="w-5 h-5 border-2 border-primary-500 border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </div>
          )}
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

      {/* Results */}
      <AnimatePresence>
        {results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-white">
                Found {results.length} result{results.length !== 1 ? 's' : ''}
              </h2>
            </div>

            <div className="grid gap-4">
              {results.map((song, index) => (
                <motion.div
                  key={`${song.track_name}-${song.artist_name}-${index}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="glass rounded-xl p-6 hover:shadow-lg transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                        <Music className="h-6 w-6 text-white" />
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* No Results */}
      <AnimatePresence>
        {query && !loading && results.length === 0 && !error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center py-12"
          >
            <div className="glass rounded-xl p-8 max-w-md mx-auto">
              <SearchIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No results found</h3>
              <p className="text-gray-400">
                Try searching for a different song, artist, or genre
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty State */}
      <AnimatePresence>
        {!query && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center py-12"
          >
            <div className="glass rounded-xl p-8 max-w-md mx-auto">
              <SearchIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Start searching</h3>
              <p className="text-gray-400">
                Enter a song title, artist name, or genre to discover music
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Search; 
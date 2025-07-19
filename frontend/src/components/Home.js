import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Music, 
  Search, 
  Heart, 
  Sparkles, 
  Play, 
  TrendingUp,
  Users,
  Zap
} from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: Search,
      title: 'Smart Search',
      description: 'Find your favorite songs and artists with our intelligent search system',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Heart,
      title: 'Personalized Recommendations',
      description: 'Get music suggestions based on your listening preferences and history',
      color: 'from-pink-500 to-rose-500'
    },
    {
      icon: Sparkles,
      title: 'AI-Powered',
      description: 'Advanced machine learning algorithms provide accurate music recommendations',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      icon: TrendingUp,
      title: 'Trending Music',
      description: 'Discover what\'s hot and trending in the music world',
      color: 'from-green-500 to-emerald-500'
    }
  ];

  const stats = [
    { icon: Music, value: '10K+', label: 'Songs' },
    { icon: Users, value: '50K+', label: 'Users' },
    { icon: Heart, value: '1M+', label: 'Recommendations' },
    { icon: Zap, value: '99%', label: 'Accuracy' }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center py-16"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <div className="relative inline-block">
            <Music className="h-24 w-24 text-primary-400 mx-auto mb-6" />
            <motion.div
              className="absolute -top-2 -right-2 h-6 w-6 bg-accent-500 rounded-full"
              animate={{ 
                scale: [1, 1.3, 1],
                rotate: [0, 360]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-7xl font-bold mb-6"
        >
          <span className="gradient-text">Discover</span>
          <br />
          <span className="text-white">Your Next</span>
          <br />
          <span className="gradient-text">Favorite Song</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
        >
          Experience the future of music discovery with our AI-powered recommendation system. 
          Find new artists, explore genres, and create your perfect playlist.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/recommendations"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Play className="h-5 w-5" />
              <span>Get Recommendations</span>
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/search"
              className="inline-flex items-center space-x-2 bg-gray-700 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-600 transition-all duration-200"
            >
              <Search className="h-5 w-5" />
              <span>Search Music</span>
            </Link>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="py-12"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                className="text-center"
              >
                <div className="glass rounded-xl p-6 hover:shadow-lg transition-all duration-200">
                  <Icon className="h-8 w-8 text-primary-400 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-gray-400">{stat.label}</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        className="py-12"
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Why Choose <span className="gradient-text">MusicFlow</span>?
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Our advanced AI system combines cutting-edge technology with your musical preferences 
            to deliver the most accurate and personalized recommendations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.8 + index * 0.1 }}
                whileHover={{ y: -10 }}
                className="glass rounded-xl p-6 hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2.2 }}
        className="text-center py-16"
      >
        <div className="glass rounded-2xl p-12 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Discover New Music?
          </h2>
          <p className="text-gray-400 mb-8 text-lg">
            Join thousands of music lovers who have already found their next favorite song.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/recommendations"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-500 to-accent-500 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Sparkles className="h-5 w-5" />
              <span>Start Exploring</span>
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home; 
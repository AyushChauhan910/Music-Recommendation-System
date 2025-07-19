import React from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Code, 
  Database, 
  Sparkles, 
  Users, 
  Heart,
  TrendingUp,
  Shield,
  Zap
} from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered',
      description: 'Advanced machine learning algorithms analyze music patterns and user preferences to deliver accurate recommendations.',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      icon: Database,
      title: 'Rich Dataset',
      description: 'Access to a comprehensive music database with thousands of songs across multiple genres and artists.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Sparkles,
      title: 'Smart Matching',
      description: 'Content-based filtering using TF-IDF and cosine similarity to find the most similar songs.',
      color: 'from-pink-500 to-rose-500'
    },
    {
      icon: Users,
      title: 'User-Friendly',
      description: 'Intuitive interface designed for music lovers to easily discover new songs and artists.',
      color: 'from-green-500 to-emerald-500'
    }
  ];

  const techStack = [
    { name: 'React', description: 'Frontend framework for building the user interface' },
    { name: 'Flask', description: 'Python web framework for the backend API' },
    { name: 'Scikit-learn', description: 'Machine learning library for recommendation algorithms' },
    { name: 'Pandas', description: 'Data manipulation and analysis' },
    { name: 'Framer Motion', description: 'Animation library for smooth user interactions' },
    { name: 'Tailwind CSS', description: 'Utility-first CSS framework for styling' }
  ];

  const benefits = [
    {
      icon: Heart,
      title: 'Personalized Experience',
      description: 'Get recommendations tailored to your musical taste and preferences.'
    },
    {
      icon: TrendingUp,
      title: 'Discover New Music',
      description: 'Find hidden gems and new artists you might not have discovered otherwise.'
    },
    {
      icon: Shield,
      title: 'Privacy Focused',
      description: 'Your music preferences stay private and are not shared with third parties.'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Get instant recommendations powered by optimized algorithms.'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-16">
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
          <Brain className="h-24 w-24 text-primary-400 mx-auto mb-6" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-6xl font-bold mb-6"
        >
          About <span className="gradient-text">MusicFlow</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto"
        >
          MusicFlow is an intelligent music recommendation system that uses advanced machine learning 
          algorithms to help you discover new music based on your preferences. Our AI analyzes music 
          patterns, genres, and artist similarities to provide personalized recommendations.
        </motion.p>
      </motion.section>

      {/* How It Works */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="py-12"
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Our recommendation system uses content-based filtering to find similar songs
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
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
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

      {/* Technology Stack */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        className="py-12"
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Technology <span className="gradient-text">Stack</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Built with modern technologies for optimal performance and user experience
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {techStack.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.8 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="glass rounded-xl p-6 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-center space-x-3 mb-3">
                <Code className="h-6 w-6 text-primary-400" />
                <h3 className="text-lg font-semibold text-white">{tech.name}</h3>
              </div>
              <p className="text-gray-400 text-sm">{tech.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Benefits */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2.2 }}
        className="py-12"
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Why Choose <span className="gradient-text">MusicFlow</span>?
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Experience the benefits of our intelligent music recommendation system
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 2.5 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className="glass rounded-xl p-8 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{benefit.title}</h3>
                    <p className="text-gray-400">{benefit.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* Algorithm Details */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 3 }}
        className="py-12"
      >
        <div className="glass rounded-2xl p-12 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">
              The <span className="gradient-text">Algorithm</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Understanding how our recommendation system works
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white mb-4">Content-Based Filtering</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Analyzes song metadata (genre, artist, title)</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Uses TF-IDF vectorization for text processing</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Calculates cosine similarity between songs</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Recommends songs with highest similarity scores</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white mb-4">Key Features</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-accent-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Real-time recommendation generation</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-accent-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Handles partial song title matching</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-accent-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Scalable architecture for large datasets</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-accent-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Continuous learning and improvement</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default About; 
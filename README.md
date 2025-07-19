# MusicFlow - AI Music Recommendation System

A beautiful, modern music recommendation system with a dark theme and smooth animations. Built with React frontend and Flask backend, featuring AI-powered content-based filtering for personalized music recommendations.

## 🎵 Features

- **AI-Powered Recommendations**: Content-based filtering using TF-IDF and cosine similarity
- **Beautiful Dark UI**: Modern, responsive design with smooth animations
- **Real-time Search**: Search through songs, artists, and genres
- **Personalized Experience**: Get recommendations based on your favorite songs
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices

## 🚀 Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Framer Motion** - Smooth animations and transitions
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **Axios** - HTTP client for API calls

### Backend
- **Flask** - Python web framework
- **Scikit-learn** - Machine learning library
- **Pandas** - Data manipulation
- **NumPy** - Numerical computing
- **Flask-CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
Music Recommendation System/
├── frontend/                 # React frontend application
│   ├── public/              # Static files
│   ├── src/                 # Source code
│   │   ├── components/      # React components
│   │   │   ├── Header.js    # Navigation header
│   │   │   ├── Home.js      # Landing page
│   │   │   ├── Search.js    # Search functionality
│   │   │   ├── Recommendations.js # Recommendation system
│   │   │   └── About.js     # About page
│   │   ├── App.js           # Main app component
│   │   ├── index.js         # Entry point
│   │   └── index.css        # Global styles
│   ├── package.json         # Frontend dependencies
│   ├── tailwind.config.js   # Tailwind configuration
│   └── postcss.config.js    # PostCSS configuration
├── backend/                  # Flask backend application
│   ├── app.py               # Main Flask application (with pandas)
│   ├── app-simple.py        # Simplified Flask app (no pandas)
│   ├── requirements.txt     # Python dependencies
│   ├── requirements-alt.txt # Alternative requirements
│   └── requirements-minimal.txt # Minimal requirements
└── Music_recommendation_system.ipynb  # Original Jupyter notebook
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- Python (v3.8 or higher)
- npm or yarn

### Backend Setup

#### Option 1: Full Installation (Recommended for Python 3.8-3.11)
1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment (optional but recommended):
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install Python dependencies:
```bash
pip install -r requirements.txt
```

4. Run the Flask backend:
```bash
python app.py
```

#### Option 2: Simplified Installation (For Python 3.13+)
If you're using Python 3.13 or having pandas installation issues:

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install minimal dependencies:
```bash
pip install -r requirements-minimal.txt
```

3. Run the simplified Flask backend:
```bash
python app-simple.py
```

#### Option 3: Alternative Requirements (For Python 3.12+)
If the main requirements don't work, try:
```bash
pip install -r requirements-alt.txt
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install Node.js dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

## 🔧 Troubleshooting

### Python 3.13 Compatibility Issues

If you encounter pandas installation errors with Python 3.13:

1. **Use the simplified backend**: Run `python app-simple.py` instead of `python app.py`
2. **Try alternative requirements**: Use `requirements-alt.txt` for newer package versions
3. **Use minimal requirements**: Use `requirements-minimal.txt` for core functionality only
4. **Downgrade Python**: Consider using Python 3.11 or 3.12 for better compatibility

### Common Installation Issues

- **pandas compilation error**: Use the simplified backend (`app-simple.py`)
- **scikit-learn issues**: Try the alternative requirements file
- **CORS errors**: Ensure Flask-CORS is installed
- **Port conflicts**: Change the port in the Flask app if 5000 is busy

## 🎯 Usage

### Getting Recommendations

1. Navigate to the "Recommendations" page
2. Enter a song title you love
3. Click "Get Recommendations" to see similar songs
4. Explore the recommended tracks

### Searching Music

1. Go to the "Search" page
2. Type a song title, artist name, or genre
3. Browse through the search results
4. Click on any song to see details

## 🔧 API Endpoints

### Backend API

- `GET /api/health` - Health check
- `GET /api/songs` - Get all songs
- `POST /api/recommendations` - Get song recommendations
- `GET /api/search?q=<query>` - Search songs
- `GET /api/genres` - Get all genres
- `GET /api/artists` - Get all artists

### Example API Usage

```javascript
// Get recommendations
const response = await fetch('/api/recommendations', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    song_title: 'Bohemian Rhapsody',
    top_n: 10
  })
});

// Search songs
const response = await fetch('/api/search?q=queen');
```

## 🎨 Design Features

### Dark Theme
- Beautiful dark color scheme
- Glass morphism effects
- Gradient text and backgrounds
- Smooth color transitions

### Animations
- Page transitions with Framer Motion
- Hover effects and micro-interactions
- Loading states and spinners
- Staggered animations for lists

### Responsive Design
- Mobile-first approach
- Adaptive layouts
- Touch-friendly interactions
- Optimized for all screen sizes

## 🤖 AI Algorithm

### Full Version (app.py)
The recommendation system uses content-based filtering:

1. **Feature Extraction**: Combines song metadata (genre, artist, title)
2. **TF-IDF Vectorization**: Converts text to numerical vectors
3. **Cosine Similarity**: Calculates similarity between songs
4. **Recommendation**: Returns songs with highest similarity scores

### Simplified Version (app-simple.py)
Uses a rule-based approach:

1. **Genre Matching**: Prioritizes songs with the same genre
2. **Artist Matching**: Favors songs by the same artist
3. **Year Proximity**: Considers release year similarity
4. **Scoring**: Combines multiple factors for final ranking

## 📊 Sample Data

The system includes a sample dataset with popular songs:
- Bohemian Rhapsody - Queen
- Hotel California - Eagles
- Imagine - John Lennon
- Stairway to Heaven - Led Zeppelin
- And many more...

## 🚀 Deployment

### Frontend Deployment
```bash
cd frontend
npm run build
```

### Backend Deployment
```bash
cd backend
gunicorn app:app  # or app-simple:app for simplified version
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Original Jupyter notebook for the recommendation algorithm
- Framer Motion for beautiful animations
- Tailwind CSS for the styling system
- Lucide for the icon set

---

**MusicFlow** - Discover your next favorite song with AI-powered recommendations! 🎵✨ 
from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import os
import json

app = Flask(__name__)
CORS(app)

# Global variables to store the model and data
data = None
tfidf_matrix = None
cosine_sim = None
tfidf = None

def load_data():
    """Load and preprocess the music dataset"""
    global data, tfidf_matrix, cosine_sim, tfidf
    
    try:
        print("Starting data load...")
        
        # Check if data file exists, if not create sample data
        data_file = 'music_data.csv'
        if not os.path.exists(data_file):
            print("Data file not found, creating sample data...")
            create_sample_data()
        else:
            print("Data file found, loading existing data...")
        
        print("Reading CSV file...")
        data = pd.read_csv(data_file)
        print(f"Loaded {len(data)} songs")
        
        # Add language column if it doesn't exist (for backward compatibility)
        if 'language' not in data.columns:
            print("Adding language column...")
            data['language'] = 'English'  # Default to English for existing data
        
        # Add mood column if it doesn't exist (for backward compatibility)
        if 'mood' not in data.columns:
            print("Adding mood column...")
            data['mood'] = 'Happy'  # Default mood for existing data
        
        print("Creating combined features...")
        # Combine song metadata into a single feature for similarity computation
        data['combined_features'] = (
            data['genre'].fillna('') + ' ' +
            data['artist_name'].fillna('') + ' ' +
            data['track_name'].fillna('') + ' ' +
            data['language'].fillna('') + ' ' +
            data['mood'].fillna('')
        )
        
        print("Creating TF-IDF matrix...")
        # Create TF-IDF matrix
        tfidf = TfidfVectorizer(stop_words='english')
        tfidf_matrix = tfidf.fit_transform(data['combined_features'])
        
        print("Calculating cosine similarity...")
        # Calculate cosine similarity
        cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)
        
        print("Data load completed successfully!")
        print(f"Data shape: {data.shape}")
        print(f"TF-IDF matrix shape: {str(getattr(tfidf_matrix, 'shape', tfidf_matrix))}")
        print(f"Cosine similarity matrix shape: {str(getattr(cosine_sim, 'shape', cosine_sim))}")
        
    except Exception as e:
        print(f"Error loading data: {str(e)}")
        raise e

def create_sample_data():
    """Create sample music data if the dataset doesn't exist"""
    sample_data = {
        'track_name': [
            # English Classics
            'Bohemian Rhapsody', 'Hotel California', 'Imagine', 'Stairway to Heaven',
            'Like a Rolling Stone', 'Hey Jude', 'Smells Like Teen Spirit', 'Yesterday',
            'Good Vibrations', 'Johnny B. Goode', 'My Generation', 'Respect',
            'What\'s Going On', 'I Want to Hold Your Hand', 'Blowin\' in the Wind',
            'Light My Fire', 'A Day in the Life', 'Help!', 'Satisfaction', 'Purple Haze',
            # Hindi Bollywood Hits
            'Tum Hi Ho', 'Chaiyya Chaiyya', 'Kal Ho Naa Ho', 'Tere Sang Yaara',
            'Raabta', 'Gerua', 'Agar Tum Saath Ho', 'Raataan Lambiyan', 'Kesariya',
            'Tum Se Hi', 'Tum Mile', 'Tere Bina', 'Tum Hi Aana',
            # Punjabi Pop Hits
            'Laung Laachi', 'Patiala Peg', 'Jatt & Juliet', 'G.O.A.T.',
            'Lover', 'Umbrella', 'Do You Know', 'Born to Shine'
        ],
        'artist_name': [
            # English Artists
            'Queen', 'Eagles', 'John Lennon', 'Led Zeppelin', 'Bob Dylan',
            'The Beatles', 'Nirvana', 'The Beatles', 'The Beach Boys', 'Chuck Berry',
            'The Who', 'Aretha Franklin', 'Marvin Gaye', 'The Beatles', 'Bob Dylan',
            'The Doors', 'The Beatles', 'The Beatles', 'The Rolling Stones', 'Jimi Hendrix',
            # Hindi Artists
            'Arijit Singh', 'A.R. Rahman', 'Sonu Nigam', 'Atif Aslam',
            'Pritam', 'Arijit Singh', 'Arijit Singh', 'Jubin Nautiyal', 'Arijit Singh',
            'Mohit Chauhan', 'Neeraj Shridhar', 'A.R. Rahman', 'Jubin Nautiyal',
            # Punjabi Artists
            'Mannat Noor', 'Diljit Dosanjh', 'Diljit Dosanjh', 'Diljit Dosanjh',
            'Diljit Dosanjh', 'Diljit Dosanjh', 'Diljit Dosanjh', 'Diljit Dosanjh'
        ],
        'genre': [
            # English Genres
            'Rock', 'Rock', 'Pop', 'Rock', 'Folk Rock', 'Pop', 'Grunge', 'Pop',
            'Pop', 'Rock', 'Rock', 'Soul', 'Soul', 'Pop', 'Folk', 'Rock', 'Pop',
            'Pop', 'Rock', 'Rock',
            # Hindi Genres
            'Bollywood', 'Bollywood', 'Bollywood', 'Bollywood',
            'Bollywood', 'Bollywood', 'Bollywood', 'Bollywood', 'Bollywood',
            'Bollywood', 'Bollywood', 'Bollywood', 'Bollywood',
            # Punjabi Genres
            'Punjabi Pop', 'Punjabi Pop', 'Punjabi Pop', 'Punjabi Pop',
            'Punjabi Pop', 'Punjabi Pop', 'Punjabi Pop', 'Punjabi Pop'
        ],
        'year': [
            # English Years
            1975, 1976, 1971, 1971, 1965, 1968, 1991, 1965, 1966, 1958, 1965,
            1967, 1971, 1963, 1963, 1967, 1967, 1965, 1965, 1967,
            # Hindi Years
            2013, 1998, 2003, 2017, 2017, 2015, 2015, 2021, 2022,
            2007, 2009, 2007, 2019,
            # Punjabi Years
            2018, 2015, 2012, 2020, 2020, 2020, 2020, 2020
        ],
        'language': [
            # English Language
            'English', 'English', 'English', 'English', 'English', 'English', 'English', 'English',
            'English', 'English', 'English', 'English', 'English', 'English', 'English', 'English',
            'English', 'English', 'English', 'English',
            # Hindi Language
            'Hindi', 'Hindi', 'Hindi', 'Hindi', 'Hindi', 'Hindi', 'Hindi', 'Hindi',
            'Hindi', 'Hindi', 'Hindi', 'Hindi', 'Hindi',
            # Punjabi Language
            'Punjabi', 'Punjabi', 'Punjabi', 'Punjabi', 'Punjabi', 'Punjabi', 'Punjabi', 'Punjabi'
        ],
        'mood': [
            # English Moods
            'Epic', 'Melancholic', 'Inspirational', 'Epic', 'Rebellious', 'Uplifting', 'Angry', 'Melancholic',
            'Happy', 'Energetic', 'Rebellious', 'Empowering', 'Soulful', 'Happy', 'Thoughtful', 'Mysterious',
            'Experimental', 'Happy', 'Energetic', 'Psychedelic',
            # Hindi Moods
            'Romantic', 'Energetic', 'Melancholic', 'Romantic', 'Romantic', 'Romantic', 'Romantic', 'Romantic',
            'Romantic', 'Romantic', 'Romantic', 'Soulful', 'Romantic',
            # Punjabi Moods
            'Happy', 'Energetic', 'Romantic', 'Confident', 'Romantic', 'Happy', 'Energetic', 'Confident'
        ]
    }
    
    df = pd.DataFrame(sample_data)
    df.to_csv('music_data.csv', index=False)

def get_recommendations(song_title, top_n=10, mood_filter=None):
    """Get music recommendations based on song title with optional mood filtering"""
    global data, cosine_sim
    
    print(f"get_recommendations called with: song_title={song_title}, top_n={top_n}, mood_filter={mood_filter}")
    print(f"data is None: {data is None}")
    print(f"cosine_sim is None: {cosine_sim is None}")
    
    if data is None or cosine_sim is None:
        print("Data not loaded, returning error")
        return {"error": "Data not loaded"}
    
    # Get the index of the song that matches the title
    idx = data[data['track_name'].str.lower() == song_title.lower()].index
    
    if len(idx) == 0:
        # Try partial matching
        idx = data[data['track_name'].str.lower().str.contains(song_title.lower())].index
    
    if len(idx) == 0:
        return {"error": "Song not found in the dataset"}
    
    idx = idx[0]
    
    # Get similarity scores for all songs
    sim_scores = list(enumerate(cosine_sim[idx]))
    
    # Sort songs based on similarity scores
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    
    # Get top N most similar songs
    sim_scores = sim_scores[1:top_n+1]  # Exclude the song itself
    song_indices = [i[0] for i in sim_scores]
    
    # Return recommended songs
    recommendations = data.iloc[song_indices]
    
    # Apply mood filter if specified
    if mood_filter:
        recommendations = recommendations[recommendations['mood'].str.lower() == mood_filter.lower()]
    
    return recommendations.to_dict(orient='records')

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    global data, cosine_sim
    
    status = "healthy"
    message = "Music Recommendation API is running"
    data_loaded = data is not None and cosine_sim is not None
    
    if not data_loaded:
        status = "unhealthy"
        message = "Data not loaded"
    
    return jsonify({
        "status": status, 
        "message": message,
        "data_loaded": data_loaded,
        "data_shape": data.shape if data is not None else None,
        "cosine_sim_shape": cosine_sim.shape if cosine_sim is not None else None
    })

@app.route('/api/songs', methods=['GET'])
def get_all_songs():
    """Get all songs in the dataset"""
    if data is None:
        return jsonify({"error": "Data not loaded"}), 500

    songs = data.loc[:, ['track_name', 'artist_name', 'genre', 'year', 'language', 'mood']].to_dict('records')
    return jsonify({"songs": songs})

@app.route('/api/recommendations', methods=['POST'])
def get_song_recommendations():
    """Get song recommendations based on input song"""
    try:
        print("Received recommendation request")
        request_data = request.get_json()
        song_title = request_data.get('song_title', '')
        top_n = request_data.get('top_n', 10)
        mood_filter = request_data.get('mood_filter', None)
        
        print(f"Searching for: {song_title}")
        
        if not song_title:
            return jsonify({"error": "Song title is required"}), 400
        
        recommendations = get_recommendations(song_title, top_n, mood_filter)
        
        print(f"Found {len(recommendations) if isinstance(recommendations, list) else 0} recommendations")
        
        if isinstance(recommendations, dict) and "error" in recommendations:
            print(f"Error: {recommendations['error']}")
            return jsonify(recommendations), 404

        response_data = {
            "query_song": song_title,
            "recommendations": recommendations
        }
        print(f"Returning {len(recommendations)} recommendations")
        return jsonify(response_data)
    
    except Exception as e:
        print(f"Exception: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/api/search', methods=['GET'])
def search_songs():
    """Search songs by title or artist"""
    query = request.args.get('q', '').lower()
    
    if not query:
        return jsonify({"error": "Search query is required"}), 400
    
    if data is None:
        return jsonify({"error": "Data not loaded"}), 500
    
    # Search in track names and artist names
    matching_songs = data[
        (data['track_name'].str.lower().str.contains(query)) |
        (data['artist_name'].str.lower().str.contains(query))
    ]
    
    results = matching_songs.loc[:, ['track_name', 'artist_name', 'genre', 'year', 'language', 'mood']].to_dict('records')
    return jsonify({"results": results})

@app.route('/api/genres', methods=['GET'])
def get_genres():
    """Get all available genres"""
    if data is None:
        return jsonify({"error": "Data not loaded"}), 500
    
    genres = data['genre'].unique().tolist()
    return jsonify({"genres": genres})

@app.route('/api/artists', methods=['GET'])
def get_artists():
    """Get all available artists"""
    if data is None:
        return jsonify({"error": "Data not loaded"}), 500
    
    artists = data['artist_name'].unique().tolist()
    return jsonify({"artists": artists})

@app.route('/api/languages', methods=['GET'])
def get_languages():
    """Get all available languages"""
    if data is None:
        return jsonify({"error": "Data not loaded"}), 500
    
    languages = data['language'].unique().tolist()
    return jsonify({"languages": languages})

@app.route('/api/moods', methods=['GET'])
def get_moods():
    """Get all available moods"""
    if data is None:
        return jsonify({"error": "Data not loaded"}), 500
    
    moods = data['mood'].unique().tolist()
    return jsonify({"moods": moods})

if __name__ == '__main__':
    print("Loading music data...")
    load_data()
    print("Data loaded successfully!")
    print("Languages: English, Hindi, Punjabi")
    app.run(debug=True, host='0.0.0.0', port=5000)

# Load data when the module is imported (for deployment)
print("Loading music data on import...")
load_data()
print("Data loaded successfully on import!") 
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
    
    # Check if data file exists, if not create sample data
    data_file = 'music_data.csv'
    if not os.path.exists(data_file):
        create_sample_data()
    
    data = pd.read_csv(data_file)
    
    # Add language column if it doesn't exist (for backward compatibility)
    if 'language' not in data.columns:
        data['language'] = 'English'  # Default to English for existing data
    
    # Combine song metadata into a single feature for similarity computation
    data['combined_features'] = (
        data['genre'].fillna('') + ' ' +
        data['artist_name'].fillna('') + ' ' +
        data['track_name'].fillna('') + ' ' +
        data['language'].fillna('')
    )
    
    # Create TF-IDF matrix
    tfidf = TfidfVectorizer(stop_words='english')
    tfidf_matrix = tfidf.fit_transform(data['combined_features'])
    
    # Calculate cosine similarity
    cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)

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
        ]
    }
    
    df = pd.DataFrame(sample_data)
    df.to_csv('music_data.csv', index=False)

def get_recommendations(song_title, top_n=10):
    """Get music recommendations based on song title"""
    global data, cosine_sim
    
    if data is None or cosine_sim is None:
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
    return recommendations.to_dict(orient='records')

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({"status": "healthy", "message": "Music Recommendation API is running"})

@app.route('/api/songs', methods=['GET'])
def get_all_songs():
    """Get all songs in the dataset"""
    if data is None:
        return jsonify({"error": "Data not loaded"}), 500

    songs = data.loc[:, ['track_name', 'artist_name', 'genre', 'year', 'language']].to_dict('records')
    return jsonify({"songs": songs})

@app.route('/api/recommendations', methods=['POST'])
def get_song_recommendations():
    """Get song recommendations based on input song"""
    try:
        request_data = request.get_json()
        song_title = request_data.get('song_title', '')
        top_n = request_data.get('top_n', 10)
        
        if not song_title:
            return jsonify({"error": "Song title is required"}), 400
        
        recommendations = get_recommendations(song_title, top_n)
        
        if "error" in recommendations:
            return jsonify(recommendations), 404
        
        return jsonify({
            "query_song": song_title,
            "recommendations": recommendations
        })
    
    except Exception as e:
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
    
    results = matching_songs.loc[:, ['track_name', 'artist_name', 'genre', 'year', 'language']].to_dict('records')
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

if __name__ == '__main__':
    print("Loading music data...")
    load_data()
    print("Data loaded successfully!")
    print("Languages: English, Hindi, Punjabi")
    app.run(debug=True, host='0.0.0.0', port=5000) 
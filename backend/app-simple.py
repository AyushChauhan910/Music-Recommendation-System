from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

# Sample music data (no pandas required)
sample_data = [
    # English Classics
    {
        'track_name': 'Bohemian Rhapsody',
        'artist_name': 'Queen',
        'genre': 'Rock',
        'year': 1975,
        'language': 'English'
    },
    {
        'track_name': 'Hotel California',
        'artist_name': 'Eagles',
        'genre': 'Rock',
        'year': 1976,
        'language': 'English'
    },
    {
        'track_name': 'Imagine',
        'artist_name': 'John Lennon',
        'genre': 'Pop',
        'year': 1971,
        'language': 'English'
    },
    {
        'track_name': 'Stairway to Heaven',
        'artist_name': 'Led Zeppelin',
        'genre': 'Rock',
        'year': 1971,
        'language': 'English'
    },
    {
        'track_name': 'Like a Rolling Stone',
        'artist_name': 'Bob Dylan',
        'genre': 'Folk Rock',
        'year': 1965,
        'language': 'English'
    },
    {
        'track_name': 'Hey Jude',
        'artist_name': 'The Beatles',
        'genre': 'Pop',
        'year': 1968,
        'language': 'English'
    },
    {
        'track_name': 'Smells Like Teen Spirit',
        'artist_name': 'Nirvana',
        'genre': 'Grunge',
        'year': 1991,
        'language': 'English'
    },
    {
        'track_name': 'Yesterday',
        'artist_name': 'The Beatles',
        'genre': 'Pop',
        'year': 1965,
        'language': 'English'
    },
    {
        'track_name': 'Good Vibrations',
        'artist_name': 'The Beach Boys',
        'genre': 'Pop',
        'year': 1966,
        'language': 'English'
    },
    {
        'track_name': 'Johnny B. Goode',
        'artist_name': 'Chuck Berry',
        'genre': 'Rock',
        'year': 1958,
        'language': 'English'
    },
    {
        'track_name': 'My Generation',
        'artist_name': 'The Who',
        'genre': 'Rock',
        'year': 1965,
        'language': 'English'
    },
    {
        'track_name': 'Respect',
        'artist_name': 'Aretha Franklin',
        'genre': 'Soul',
        'year': 1967,
        'language': 'English'
    },
    {
        'track_name': "What's Going On",
        'artist_name': 'Marvin Gaye',
        'genre': 'Soul',
        'year': 1971,
        'language': 'English'
    },
    {
        'track_name': 'I Want to Hold Your Hand',
        'artist_name': 'The Beatles',
        'genre': 'Pop',
        'year': 1963,
        'language': 'English'
    },
    {
        'track_name': "Blowin' in the Wind",
        'artist_name': 'Bob Dylan',
        'genre': 'Folk',
        'year': 1963,
        'language': 'English'
    },
    {
        'track_name': 'Light My Fire',
        'artist_name': 'The Doors',
        'genre': 'Rock',
        'year': 1967,
        'language': 'English'
    },
    {
        'track_name': 'A Day in the Life',
        'artist_name': 'The Beatles',
        'genre': 'Pop',
        'year': 1967,
        'language': 'English'
    },
    {
        'track_name': 'Help!',
        'artist_name': 'The Beatles',
        'genre': 'Pop',
        'year': 1965,
        'language': 'English'
    },
    {
        'track_name': 'Satisfaction',
        'artist_name': 'The Rolling Stones',
        'genre': 'Rock',
        'year': 1965,
        'language': 'English'
    },
    {
        'track_name': 'Purple Haze',
        'artist_name': 'Jimi Hendrix',
        'genre': 'Rock',
        'year': 1967,
        'language': 'English'
    },
    # Hindi Classics
    {
        'track_name': 'Tum Hi Ho',
        'artist_name': 'Arijit Singh',
        'genre': 'Bollywood',
        'year': 2013,
        'language': 'Hindi'
    },
    {
        'track_name': 'Chaiyya Chaiyya',
        'artist_name': 'A.R. Rahman',
        'genre': 'Bollywood',
        'year': 1998,
        'language': 'Hindi'
    },
    {
        'track_name': 'Kal Ho Naa Ho',
        'artist_name': 'Sonu Nigam',
        'genre': 'Bollywood',
        'year': 2003,
        'language': 'Hindi'
    },
    {
        'track_name': 'Tere Sang Yaara',
        'artist_name': 'Atif Aslam',
        'genre': 'Bollywood',
        'year': 2017,
        'language': 'Hindi'
    },
    {
        'track_name': 'Raabta',
        'artist_name': 'Pritam',
        'genre': 'Bollywood',
        'year': 2017,
        'language': 'Hindi'
    },
    {
        'track_name': 'Gerua',
        'artist_name': 'Arijit Singh',
        'genre': 'Bollywood',
        'year': 2015,
        'language': 'Hindi'
    },
    {
        'track_name': 'Agar Tum Saath Ho',
        'artist_name': 'Arijit Singh',
        'genre': 'Bollywood',
        'year': 2015,
        'language': 'Hindi'
    },
    {
        'track_name': 'Raataan Lambiyan',
        'artist_name': 'Jubin Nautiyal',
        'genre': 'Bollywood',
        'year': 2021,
        'language': 'Hindi'
    },
    {
        'track_name': 'Kesariya',
        'artist_name': 'Arijit Singh',
        'genre': 'Bollywood',
        'year': 2022,
        'language': 'Hindi'
    },
    {
        'track_name': 'Tum Se Hi',
        'artist_name': 'Mohit Chauhan',
        'genre': 'Bollywood',
        'year': 2007,
        'language': 'Hindi'
    },
    {
        'track_name': 'Tum Mile',
        'artist_name': 'Neeraj Shridhar',
        'genre': 'Bollywood',
        'year': 2009,
        'language': 'Hindi'
    },
    {
        'track_name': 'Tere Bina',
        'artist_name': 'A.R. Rahman',
        'genre': 'Bollywood',
        'year': 2007,
        'language': 'Hindi'
    },
    {
        'track_name': 'Tum Hi Aana',
        'artist_name': 'Jubin Nautiyal',
        'genre': 'Bollywood',
        'year': 2019,
        'language': 'Hindi'
    },
    {
        'track_name': 'Raabta',
        'artist_name': 'Pritam',
        'genre': 'Bollywood',
        'year': 2017,
        'language': 'Hindi'
    },
    {
        'track_name': 'Tum Se Hi',
        'artist_name': 'Mohit Chauhan',
        'genre': 'Bollywood',
        'year': 2007,
        'language': 'Hindi'
    },
    {
        'track_name': 'Tere Sang Yaara',
        'artist_name': 'Atif Aslam',
        'genre': 'Bollywood',
        'year': 2017,
        'language': 'Hindi'
    },
    {
        'track_name': 'Kal Ho Naa Ho',
        'artist_name': 'Sonu Nigam',
        'genre': 'Bollywood',
        'year': 2003,
        'language': 'Hindi'
    },
    {
        'track_name': 'Chaiyya Chaiyya',
        'artist_name': 'A.R. Rahman',
        'genre': 'Bollywood',
        'year': 1998,
        'language': 'Hindi'
    },
    {
        'track_name': 'Tum Hi Ho',
        'artist_name': 'Arijit Singh',
        'genre': 'Bollywood',
        'year': 2013,
        'language': 'Hindi'
    },
    # Punjabi Hits
    {
        'track_name': 'Laung Laachi',
        'artist_name': 'Mannat Noor',
        'genre': 'Punjabi Pop',
        'year': 2018,
        'language': 'Punjabi'
    },
    {
        'track_name': 'Diljit Dosanjh',
        'artist_name': 'Diljit Dosanjh',
        'genre': 'Punjabi Pop',
        'year': 2020,
        'language': 'Punjabi'
    },
    {
        'track_name': 'Patiala Peg',
        'artist_name': 'Diljit Dosanjh',
        'genre': 'Punjabi Pop',
        'year': 2015,
        'language': 'Punjabi'
    },
    {
        'track_name': 'Jatt & Juliet',
        'artist_name': 'Diljit Dosanjh',
        'genre': 'Punjabi Pop',
        'year': 2012,
        'language': 'Punjabi'
    },
    {
        'track_name': 'G.O.A.T.',
        'artist_name': 'Diljit Dosanjh',
        'genre': 'Punjabi Pop',
        'year': 2020,
        'language': 'Punjabi'
    },
    {
        'track_name': 'Lover',
        'artist_name': 'Diljit Dosanjh',
        'genre': 'Punjabi Pop',
        'year': 2020,
        'language': 'Punjabi'
    },
    {
        'track_name': 'Umbrella',
        'artist_name': 'Diljit Dosanjh',
        'genre': 'Punjabi Pop',
        'year': 2020,
        'language': 'Punjabi'
    },
    {
        'track_name': 'Do You Know',
        'artist_name': 'Diljit Dosanjh',
        'genre': 'Punjabi Pop',
        'year': 2020,
        'language': 'Punjabi'
    },
    {
        'track_name': 'Born to Shine',
        'artist_name': 'Diljit Dosanjh',
        'genre': 'Punjabi Pop',
        'year': 2020,
        'language': 'Punjabi'
    },
    {
        'track_name': 'Lover',
        'artist_name': 'Diljit Dosanjh',
        'genre': 'Punjabi Pop',
        'year': 2020,
        'language': 'Punjabi'
    },
    {
        'track_name': 'Umbrella',
        'artist_name': 'Diljit Dosanjh',
        'genre': 'Punjabi Pop',
        'year': 2020,
        'language': 'Punjabi'
    },
    {
        'track_name': 'Do You Know',
        'artist_name': 'Diljit Dosanjh',
        'genre': 'Punjabi Pop',
        'year': 2020,
        'language': 'Punjabi'
    },
    {
        'track_name': 'Born to Shine',
        'artist_name': 'Diljit Dosanjh',
        'genre': 'Punjabi Pop',
        'year': 2020,
        'language': 'Punjabi'
    },
    {
        'track_name': 'G.O.A.T.',
        'artist_name': 'Diljit Dosanjh',
        'genre': 'Punjabi Pop',
        'year': 2020,
        'language': 'Punjabi'
    },
    {
        'track_name': 'Jatt & Juliet',
        'artist_name': 'Diljit Dosanjh',
        'genre': 'Punjabi Pop',
        'year': 2012,
        'language': 'Punjabi'
    },
    {
        'track_name': 'Patiala Peg',
        'artist_name': 'Diljit Dosanjh',
        'genre': 'Punjabi Pop',
        'year': 2015,
        'language': 'Punjabi'
    },
    {
        'track_name': 'Laung Laachi',
        'artist_name': 'Mannat Noor',
        'genre': 'Punjabi Pop',
        'year': 2018,
        'language': 'Punjabi'
    }
]

def simple_similarity(song1, song2):
    """Simple similarity calculation based on genre, artist, and language"""
    score = 0
    
    # Language similarity (highest priority)
    if song1.get('language') == song2.get('language'):
        score += 5
    
    # Genre similarity
    if song1['genre'] == song2['genre']:
        score += 3
    
    # Artist similarity
    if song1['artist_name'] == song2['artist_name']:
        score += 2
    
    # Year similarity (closer years get higher scores)
    year_diff = abs(song1['year'] - song2['year'])
    if year_diff <= 5:
        score += 1
    elif year_diff <= 10:
        score += 0.5
    
    return score

def get_recommendations(song_title, top_n=10):
    """Get music recommendations based on song title"""
    # Find the query song
    query_song = None
    for song in sample_data:
        if song['track_name'].lower() == song_title.lower():
            query_song = song
            break
    
    if not query_song:
        # Try partial matching
        for song in sample_data:
            if song_title.lower() in song['track_name'].lower():
                query_song = song
                break
    
    if not query_song:
        return {"error": "Song not found in the dataset"}
    
    # Calculate similarities
    similarities = []
    for song in sample_data:
        if song['track_name'] != query_song['track_name']:
            similarity = simple_similarity(query_song, song)
            similarities.append((song, similarity))
    
    # Sort by similarity score
    similarities.sort(key=lambda x: x[1], reverse=True)
    
    # Return top N recommendations
    recommendations = [song for song, score in similarities[:top_n]]
    return recommendations

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({"status": "healthy", "message": "Music Recommendation API is running"})

@app.route('/api/songs', methods=['GET'])
def get_all_songs():
    """Get all songs in the dataset"""
    return jsonify({"songs": sample_data})

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
    
    # Search in track names and artist names
    results = []
    for song in sample_data:
        if (query in song['track_name'].lower() or 
            query in song['artist_name'].lower()):
            results.append(song)
    
    return jsonify({"results": results})

@app.route('/api/genres', methods=['GET'])
def get_genres():
    """Get all available genres"""
    genres = list(set(song['genre'] for song in sample_data))
    return jsonify({"genres": genres})

@app.route('/api/artists', methods=['GET'])
def get_artists():
    """Get all available artists"""
    artists = list(set(song['artist_name'] for song in sample_data))
    return jsonify({"artists": artists})

@app.route('/api/languages', methods=['GET'])
def get_languages():
    """Get all available languages"""
    languages = list(set(song.get('language', 'Unknown') for song in sample_data))
    return jsonify({"languages": languages})

if __name__ == '__main__':
    print("Starting MusicFlow API with multilingual sample data...")
    print(f"Loaded {len(sample_data)} songs")
    print("Languages: English, Hindi, Punjabi")
    app.run(debug=True, host='0.0.0.0', port=5000) 
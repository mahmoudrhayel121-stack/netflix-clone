import requests
import json
import random
import time

# You need a TMDB API key to run this scraper
TMDB_API_KEY = "3b94f326cb04407eaa15df56063a4c98"
TMDB_BASE_URL = "https://api.themoviedb.org/3"
BACKEND_API_URL = "http://localhost:5000/api/movies"
CATEGORY_API_URL = "http://localhost:5000/api/categories"

# Assuming admin token is provided to make POST requests
ADMIN_TOKEN = "YOUR_ADMIN_JWT_TOKEN"

HEADERS = {
    "Authorization": f"Bearer {ADMIN_TOKEN}",
    "Content-Type": "application/json"
}

# Example embed URLs for testing monetization
DUMMY_EMBED_URLS = [
    "https://www.youtube.com/embed/dQw4w9WgXcQ",
    "https://www.youtube.com/embed/tgbNymZ7vqY"
]

def fetch_genres():
    print("Fetching genres from TMDB...")
    response = requests.get(f"{TMDB_BASE_URL}/genre/movie/list?api_key={TMDB_API_KEY}&language=en-US")
    if response.status_code == 200:
        genres = response.json().get("genres", [])
        genre_map = {}
        for genre in genres:
            slug = genre["name"].lower().replace(" ", "-")
            
            # Create category in our backend
            cat_payload = {"name": genre["name"], "slug": slug}
            cat_res = requests.post(CATEGORY_API_URL, json=cat_payload, headers=HEADERS)
            if cat_res.status_code in [201, 400]:
                print(f"Category {genre['name']} processed.")
                # We should really fetch the category IDs from our backend to link them
            
            genre_map[genre["id"]] = genre["name"]
        return genre_map
    else:
        print("Failed to fetch genres.")
        return {}

def fetch_popular_movies(page=1):
    print(f"Fetching popular movies (page {page})...")
    response = requests.get(f"{TMDB_BASE_URL}/movie/popular?api_key={TMDB_API_KEY}&language=en-US&page={page}")
    if response.status_code == 200:
        return response.json().get("results", [])
    else:
        print("Failed to fetch movies.")
        return []

def main():
    genres = fetch_genres()
    
    # We will need to map TMDB genre IDs to our Database Category ObjectIDs.
    # For now, this script outlines the logic. In a real scenario, you'd fetch all categories from DB and build a mapping.
    print("Please ensure categories exist in DB and update the script to map ObjectIDs.")
    
    # Fetch 1 page of popular movies
    movies = fetch_popular_movies(1)
    
    for movie in movies:
        title = movie.get("title")
        description = movie.get("overview")
        poster_path = movie.get("poster_path")
        backdrop_path = movie.get("backdrop_path")
        rating = movie.get("vote_average")
        release_date = movie.get("release_date")
        
        poster_url = f"https://image.tmdb.org/t/p/w500{poster_path}" if poster_path else ""
        backdrop_url = f"https://image.tmdb.org/t/p/original{backdrop_path}" if backdrop_path else ""
        
        embed_url = random.choice(DUMMY_EMBED_URLS)
        
        payload = {
            "title": title,
            "description": description,
            "posterUrl": poster_url,
            "backdropUrl": backdrop_url,
            "embedUrl": embed_url,
            "rating": rating,
            "releaseDate": release_date,
            "seoTitle": f"Watch {title} Full Movie Online",
            "seoDescription": description[:150] + "...",
            "isFeatured": random.choice([True, False, False, False])
        }
        
        print(f"Would post to backend: {title}")
        # res = requests.post(BACKEND_API_URL, json=payload, headers=HEADERS)
        # if res.status_code == 201:
        #     print(f"Successfully added: {title}")
        # else:
        #     print(f"Failed to add: {title} - {res.text}")
        
        time.sleep(0.5)

if __name__ == "__main__":
    main()

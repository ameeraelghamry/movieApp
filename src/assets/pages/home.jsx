import React, { useEffect, useState } from 'react';
import Search from '../components/search.jsx';
import Spinner from '../components/spinner.jsx';
import MovieCard from '../components/movieCard.jsx';
import { useDebounce } from 'react-use';
import { getTrendingMovies, updateSearchCount } from './../services/appwrite.js';
import ResponsiveAppBar from '../components/appBar.jsx';
import { Link } from 'react-router-dom';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }
};

const home = () => {
    const [debouncedSearchTerm, setDebounceSearchTerm] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [movieList, setMovieList] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [trendingMovies, setTrendingMovies] = useState([]);

    useDebounce(() => setDebounceSearchTerm(searchTerm), 500, [searchTerm]);

    const fetchMovies = async (query = '') => {
        setIsLoading(true);
        setErrorMessage('');

        try {
            const endpoint = query
                ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
                : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

            const response = await fetch(endpoint, API_OPTIONS);

            if (!response.ok) {
                throw new Error('Failed to fetch movies');
            }

            const data = await response.json();
            setMovieList(data.results || []);

            if (query && data.results.length > 0) {
                await updateSearchCount(query, data.results[0]);
            }

        } catch (error) {
            console.error(`Error fetching movies: ${error}`);
            setErrorMessage('Error fetching movies. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    const loadTrendingMovies = async () => {
        try {
            const movies = await getTrendingMovies();
            setTrendingMovies(movies);
        } catch (error) {
            console.error(`Error fetching trending movies: ${error}`);
        }
    };

    useEffect(() => {
        fetchMovies(debouncedSearchTerm);
    }, [debouncedSearchTerm]);

    useEffect(() => {
        loadTrendingMovies();
    }, []);

    return (
        <div className='wrapper pt-0'>
            <header>
                <img src='/hero-img.png' alt='hero banner' />
                <h1>
                    Find <span className='text-gradient'>Movies</span> You'll Enjoy Without The Hassle
                </h1>
                <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </header>

            {trendingMovies.length > 0 && (
                <section className="trending">
                    <h2>Trending Movies</h2>
                    <ul>
                        {trendingMovies.map((movie, index) => (
                            <li key={movie.$id} className="relative group/trending">
                                {/* 1. THE BACKGROUND GLOW (Trending) */}
                                <div className="absolute inset-0 bg-light-100/10 blur-[40px] rounded-full scale-0 transition-transform duration-500 group-hover/trending:scale-110 pointer-events-none z-0" />

                                <Link
                                    to={`/movie/${movie.tmdb_id || movie.movie_id}`}
                                    className="relative z-10 group flex flex-row items-center transition-all duration-300 ease-out hover:scale-110 hover:z-10"
                                >
                                    <p className="transition-transform duration-300 group-hover:translate-x-[-10px]">
                                        {index + 1}
                                    </p>
                                    <img
                                        src={movie.poster_url}
                                        alt={movie.title}
                                        className="shadow-lg shadow-black/50"
                                    />
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            <section className='mt-[40px] all-movies'>
                <h2>All Movies</h2>

                {isLoading ? (
                    <Spinner />
                ) : errorMessage ? (
                    <p className='text-red-500'>{errorMessage}</p>
                ) : (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {movieList.map((movie) => (
                            <li key={movie.id} className="relative group/card">
                                {/* 2. THE BACKGROUND GLOW (All Movies) */}
                                <div className="absolute inset-[-10px] bg-purple-500/10 blur-[30px] rounded-2xl opacity-0 transition-opacity duration-500 group-hover/card:opacity-100 pointer-events-none z-0" />

                                <Link to={`/movie/${movie.id}`} className="relative z-10 block transition-transform hover:scale-105">
                                    <MovieCard movie={movie} />
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </div>
    );
};

export default home;
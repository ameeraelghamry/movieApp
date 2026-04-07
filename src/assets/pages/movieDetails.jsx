import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Or however you handle routing
import { getMovieDetails } from "../services/tmdb"; // Adjust path to your tmdb.js
import { MovieDetail } from "../components/movieDetailsPage/movieDetails"; // The component we fixed earlier

export default function MovieDetailsPage() {
    // 1. Get the ID from the URL (Vite/React Router style)
    const { id } = useParams();

    // 2. Set up state for data, loading, and errors
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 3. Fetch data inside useEffect
    useEffect(() => {
        async function loadData() {
            try {
                setLoading(true);
                // Use the function from tmdb.js
                const data = await getMovieDetails(id);
                setMovie(data);
            } catch (err) {
                console.error(err);
                setError("Failed to load movie details.");
            } finally {
                setLoading(false);
            }
        }

        if (id) {
            loadData();
        }
    }, [id]);

    // 4. Handle UI states
    if (loading) return <div className="p-10 text-center">Loading...</div>;
    if (error) return <div className="p-10 text-center text-red-500">{error}</div>;
    if (!movie) return null;

    // 5. Render the actual UI
    return (
        <div className="min-h-screen bg-background py-10">
            <MovieDetail movie={movie} />
        </div>
    );
}
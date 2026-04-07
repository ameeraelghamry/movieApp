// 1. Use import.meta.env for Vite
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY
const TMDB_BASE_URL = "https://api.themoviedb.org/3"
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p"

async function fetchFromTMDb(endpoint) {
    const response = await fetch(`${TMDB_BASE_URL}${endpoint}`, {
        headers: {
            // Ensure you are using your TMDB Read Access Token (API Key) here
            Authorization: `Bearer ${TMDB_API_KEY}`,
            "Content-Type": "application/json",
        },
        // 'next' property removed as it is Next.js specific
    })

    if (!response.ok) {
        throw new Error(`TMDb API error: ${response.status} ${response.statusText}`)
    }

    return response.json()
}

export function getImageUrl(path, size = "w500") {
    if (!path) {
        return "/placeholder.svg"
    }
    return `${TMDB_IMAGE_BASE_URL}/${size}${path}`
}

function formatRuntime(minutes) {
    if (!minutes) return "N/A"
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
}

function formatCurrency(amount) {
    if (amount === 0) return "N/A"
    if (amount >= 1_000_000_000) {
        return `$${(amount / 1_000_000_000).toFixed(1)} Billion`
    }
    if (amount >= 1_000_000) {
        return `$${(amount / 1_000_000).toFixed(1)} Million`
    }
    return `$${amount.toLocaleString()}`
}

function formatVoteCount(count) {
    if (count >= 1_000_000) {
        return `${(count / 1_000_000).toFixed(1)}M`
    }
    if (count >= 1_000) {
        return `${(count / 1_000).toFixed(0)}K`
    }
    return count.toString()
}

function formatReleaseDate(dateString) {
    if (!dateString) return "N/A"
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    })
}

export async function getMovieDetails(movieId, trendingPosition = null) {
    const [movie, videos, releaseDates] = await Promise.all([
        fetchFromTMDb(`/movie/${movieId}?language=en-US`),
        fetchFromTMDb(`/movie/${movieId}/videos?language=en-US`),
        fetchFromTMDb(`/movie/${movieId}/release_dates`),
    ])

    const trailer = videos.results.find(
        (v) => v.site === "YouTube" && (v.type === "Trailer" || v.type === "Teaser") && v.official
    ) || videos.results.find((v) => v.site === "YouTube" && v.type === "Trailer") || videos.results[0]

    const usRelease = releaseDates.results.find((r) => r.iso_3166_1 === "US")
    const certification = usRelease?.release_dates.find((rd) => rd.certification)?.certification || "NR"

    return {
        id: movie.id,
        title: movie.title,
        year: new Date(movie.release_date).getFullYear(),
        rating: certification,
        duration: formatRuntime(movie.runtime),
        posterUrl: getImageUrl(movie.poster_path, "w500"),
        backdropUrl: getImageUrl(movie.backdrop_path, "w1280"),
        trailerUrl: trailer ? `https://img.youtube.com/vi/${trailer.key}/maxresdefault.jpg` : getImageUrl(movie.backdrop_path, "w780"),
        trailerKey: trailer?.key || null,
        trailerDuration: "2:30",
        genres: movie.genres.map((g) => g.name),
        overview: movie.overview || "No overview available.",
        releaseDate: formatReleaseDate(movie.release_date),
        countries: movie.production_countries.map((c) => c.name),
        status: movie.status,
        languages: movie.spoken_languages.map((l) => l.english_name),
        budget: formatCurrency(movie.budget),
        revenue: formatCurrency(movie.revenue),
        tagline: movie.tagline || "No tagline available.",
        productionCompanies: movie.production_companies.map((c) => c.name),
        voteAverage: Math.round(movie.vote_average * 10) / 10,
        voteCount: formatVoteCount(movie.vote_count),
        trendingPosition: trendingPosition ?? null,
        homepage: movie.homepage || null,
    }
}
"use client";

import { ExternalLink } from "lucide-react";
import { GenreTag } from "./genreTag";
import { InfoRow } from "./infoRow";
import { RatingBadge } from "./ratingBadge";
import { TrendingBadge } from "./trendingBadge";
import { TrailerCard } from "./trailerCard";
import { Button } from "../button";

export function MovieDetail({ movie }) {
    return (
        <div className="relative w-full max-w-5xl mx-auto group">

            {/* 1. The SHARP External Glow (Controlled by group-hover) */}
            <div className="absolute inset-0 bg-gradient-to-r from-light-100/50 to-purple-500/50 rounded-2xl blur-lg opacity-30 transition-all duration-1000 group-hover:blur-md group-hover:opacity-70 group-hover:inset-[-2px] pointer-events-none" />

            {/* The Main Card with SHARP Light Border */}
            <div className="relative w-full bg-[#0f0d23] rounded-2xl p-6 md:p-10 shadow-[0_0_20px_rgba(206,206,251,0.2)] overflow-hidden border border-light-100/20">

                {/* 2. The SHARP INSET Light Glow - Radial, pinned to the top-right edge */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_100%_0%,rgba(206,206,251,0.15)_0%,transparent_70%)] pointer-events-none rounded-tr-2xl" />

                {/* 3. A complementary SHARP INSET Light Glow - Radial, pinned to the bottom-left edge */}
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[radial-gradient(circle_at_0%_100%,rgba(168,181,219,0.1)_0%,transparent_60%)] pointer-events-none rounded-bl-2xl" />

                {/* Content Wrapper (Ensure content is above glows) */}
                <div className="relative z-10">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 text-balance">
                                {movie.title}
                            </h1>
                            <div className="flex items-center gap-2 text-gray-400 text-sm">
                                <span>{movie.year}</span>
                                <span>•</span>
                                <span>{movie.rating}</span>
                                <span>•</span>
                                <span>{movie.duration}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <RatingBadge rating={movie.voteAverage} votes={movie.voteCount} />
                            {movie.trendingPosition && <TrendingBadge position={movie.trendingPosition} />}
                        </div>
                    </div>

                    {/* Media Section */}
                    <div className="flex flex-col md:flex-row gap-4 mb-8">
                        <div className="relative rounded-xl overflow-hidden aspect-[2/3] md:w-[280px] md:shrink-0 shadow-xl border border-white/5">
                            <img
                                src={movie.posterUrl}
                                alt={`${movie.title} poster`}
                                className="absolute inset-0 w-full h-full object-cover"
                                loading="eager"
                            />
                        </div>
                        <div className="flex-1">
                            <TrailerCard
                                imageUrl={movie.trailerUrl}
                                duration={movie.trailerDuration}
                                trailerKey={movie.trailerKey}
                            />
                        </div>
                    </div>

                    {/* Genres and Homepage */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                            <span className="text-gray-400 w-24 shrink-0 font-medium">Genres</span>
                            <div className="flex flex-wrap gap-2">
                                {movie.genres.map((genre) => (
                                    <GenreTag key={genre} genre={genre} />
                                ))}
                            </div>
                        </div>
                        {movie.homepage && (
                            <Button
                                variant="secondary"
                                className="group w-fit px-5 py-5 rounded-xl border border-light-100/10 bg-white/5 hover:bg-white/10 transition-all shadow-lg"
                                asChild
                            >
                                <a
                                    href={movie.homepage}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span className="font-semibold text-white">Visit Movie Homepage</span>
                                    <ExternalLink className="w-4 h-4 ml-2 text-white/70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                </a>
                            </Button>
                        )}
                    </div>

                    {/* Info Section */}
                    <div className="space-y-4 border-t border-white/5 pt-8">
                        <div className="space-y-4">
                            <InfoRow label="Overview" value={movie.overview} />
                            <InfoRow label="Release date" value={movie.releaseDate} />
                            {movie.status && <InfoRow label="Status" value={movie.status} />}
                            <InfoRow label="Budget" value={movie.budget} />
                            <InfoRow label="Revenue" value={movie.revenue} />
                            {movie.tagline && movie.tagline !== "No tagline available." && (
                                <InfoRow label="Tagline" value={movie.tagline} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
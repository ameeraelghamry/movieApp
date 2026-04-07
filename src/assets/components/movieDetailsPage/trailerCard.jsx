import { Play } from "lucide-react";

export function TrailerCard({ imageUrl, duration, trailerKey }) {
    const handleClick = () => {
        if (trailerKey) {
            window.open(`https://www.youtube.com/watch?v=${trailerKey}`, "_blank", "noopener,noreferrer");
        }
    };

    return (
        <div
            className="relative rounded-xl overflow-hidden group cursor-pointer aspect-video md:aspect-auto md:h-full bg-muted"
            onClick={handleClick}
            role={trailerKey ? "button" : undefined}
            tabIndex={trailerKey ? 0 : undefined}
            onKeyDown={(e) => {
                if (trailerKey && (e.key === "Enter" || e.key === " ")) {
                    e.preventDefault();
                    handleClick();
                }
            }}
        >
            <img
                src={imageUrl}
                alt="Movie trailer thumbnail"
                // Using standard HTML img attributes
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30 transition-opacity group-hover:bg-black/40" />

            {/* Controls Info */}
            <div className="absolute bottom-4 left-4 flex items-center gap-2">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm transition-colors group-hover:bg-white/30">
                    <Play className="w-5 h-5 text-white fill-white" />
                </div>
                <span className="text-sm font-medium text-white">Trailer</span>
                {duration && (
                    <>
                        <span className="text-white/60 text-sm">•</span>
                        <span className="text-sm text-white/60">{duration}</span>
                    </>
                )}
            </div>
        </div>
    );
}
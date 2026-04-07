import { Star } from "lucide-react"

export function RatingBadge({ rating, votes }) {
    return (
        // Added 'w-fit' to ensure the pill doesn't stretch and 'bg-white/5' for a subtle background
        <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full w-fit border border-white/10">
            {/* 'text-yellow-400' for the outline, 'fill-yellow-400' for the inside */}
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />

            <span className="text-sm font-semibold text-white">
                {rating}
                <span className="text-gray-400 font-normal ml-1 text-xs">
                    /10 ({votes})
                </span>
            </span>
        </div>
    )
}
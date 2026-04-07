import { TrendingUp } from "lucide-react"

export function TrendingBadge({ position }) {
    return (
        <div className="flex items-center gap-1.5 bg-secondary px-3 py-1.5 rounded-full">
            <TrendingUp className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-foreground">{position}</span>
        </div>
    )
}

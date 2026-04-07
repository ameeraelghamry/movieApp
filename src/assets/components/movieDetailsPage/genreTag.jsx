export function GenreTag({ genre }) {
    return (
        <span className="px-4 py-1.5 text-sm font-medium rounded-full border border-border text-foreground hover:bg-secondary transition-colors cursor-pointer">
            {genre}
        </span>
    )
}

export function InfoRow({ label, value, highlight = false }) {
    const displayValue = Array.isArray(value) ? value.join('  •  ') : value

    return (
        <div className="flex flex-col sm:flex-row gap-1 sm:gap-0">
            <span className="text-muted-foreground w-full sm:w-40 shrink-0">{label}</span>
            <span className={highlight ? "text-primary" : "text-foreground"}>
                {displayValue}
            </span>
        </div>
    )
}

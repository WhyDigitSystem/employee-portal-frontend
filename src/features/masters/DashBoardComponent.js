function DashBoardComponent({title, icon, value, description, colorIndex}){

    const COLORS = ["blue", "green", "primary", "gray"]

    const getDescStyle = () => {
        if(description.includes("↗︎"))return "font-bold text-green-700 dark:text-green-300"
        else if(description.includes("↙"))return "font-bold text-rose-500 dark:text-red-400"
        else return ""
    }

    return(
        <div className="stats shadow">
            <div className="stat">
            <div className="dark:text-slate-300 text-right font-semibold">{title}</div>
                <div className="flex justify-between mt-4 mb-2">
                <div className={`w-10 h-10 rounded dark:text-slate-300 bg-${COLORS[colorIndex]} text-${COLORS[colorIndex]}`}>{icon}</div>
                <div className={`font-semibold text-3xl mt-2 text-right dark:text-slate-100 text-${COLORS[colorIndex]}`}>{value}</div>
                </div>
                <div className={"stat-desc  " + getDescStyle()}>{description}</div>
            </div>
        </div>
    )
}

export default DashBoardComponent
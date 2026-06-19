function Heatmap({ history }) {
  const cells = [];

  for (let i = 0; i < 30; i++) {
    cells.push(null);
  }

  history.slice(-30).forEach((day, index) => {
    cells[index] = day;
  });

  const getColor = (percentage) => {
  if (percentage === 0)
    return "bg-[#222]";

  if (percentage <= 20)
    return "bg-red-700";

  if (percentage <= 40)
    return "bg-orange-600";

  if (percentage <= 60)
    return "bg-yellow-500";

  if (percentage <= 80)
    return "bg-lime-500";

  return "bg-emerald-400";
};

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">
          🔥 30 Day Heatmap
        </h2>

        <span className="text-sm text-gray-400">
          Last 30 Days
        </span>
      </div>

      <div className="bg-[#1c1c1c] border border-slate-700 rounded-2xl p-6">
        <div className="grid grid-cols-6 gap-3">
          {cells.map((day, index) => (
            <div
              key={index}
              title={
  day
    ? `${day.date}
Completion: ${day.percentage}%`
    : "No data recorded"
}
              className={`
                h-12
                rounded-lg
                border
                border-slate-700
                transition-all
                duration-300
                hover:scale-110
                hover:border-emerald-400
                ${
                  day
                    ? getColor(
                        day.percentage
                      )
                    : "bg-[#222]"
                }
              `}
            />
          ))}
        </div>

        <div className="flex items-center justify-end gap-2 mt-5 text-xs text-gray-400">
          <span>Less</span>

          <div className="w-4 h-4 rounded bg-[#222]" />

          <div className="w-4 h-4 rounded bg-emerald-900" />

          <div className="w-4 h-4 rounded bg-emerald-700" />

          <div className="w-4 h-4 rounded bg-emerald-500" />

          <div className="w-4 h-4 rounded bg-emerald-300" />

          <span>More</span>
        </div>
      </div>
    </div>
  );
}

export default Heatmap;
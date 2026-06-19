function HistoryChart({ history }) {
  const last7Days = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);

    const dateString = date
      .toISOString()
      .split("T")[0];

    const savedDay = history.find(
      (item) => item.date === dateString
    );

    last7Days.push({
      day: date
        .toLocaleDateString("en-US", {
          weekday: "short",
        })
        .toUpperCase(),

      percentage: savedDay
        ? savedDay.percentage
        : 0,
    });
  }

  const average = Math.round(
    last7Days.reduce(
      (sum, day) => sum + day.percentage,
      0
    ) / 7
  );

  const bestDay = Math.max(
    ...last7Days.map(
      (day) => day.percentage
    )
  );

  return (
    <div className="mt-12">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <h2 className="text-3xl font-bold">
          📈 Last 7 Days
        </h2>

        <div className="flex gap-8">
          <div className="text-right">
            <p className="text-gray-400 text-sm">
              Average
            </p>

            <p className="font-bold text-xl">
              {average}%
            </p>
          </div>

          <div className="text-right">
            <p className="text-gray-400 text-sm">
              Best
            </p>

            <p className="font-bold text-xl text-emerald-400">
              {bestDay}%
            </p>
          </div>
        </div>
      </div>

      <div className="bg-[#1c1c1c] border border-slate-700 rounded-3xl p-4 md:p-8 overflow-x-auto">
        <div className="flex items-end justify-between h-80 min-w-[500px]">
          {last7Days.map((day, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-end h-full flex-1"
            >
              <span className="text-xs text-emerald-400 mb-2 font-semibold">
                {day.percentage > 0
                  ? `${day.percentage}%`
                  : ""}
              </span>

              {day.percentage > 0 ? (
                <div
                className="
  w-8 md:w-14
  rounded-t-2xl
  bg-gradient-to-t
  from-emerald-600
  to-emerald-300
  transition-all
  duration-300
  hover:scale-105
"
                  style={{
                    height: `${Math.max(
                      day.percentage * 3,
                      10
                    )}px`,
                  }}
                />
              ) : (
                
                <div className="w-8 md:w-14 h-1 bg-slate-700 rounded-full" />
              )}

              <span className="mt-3 text-xs md:text-base text-gray-400 font-medium">
                {day.day}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HistoryChart;
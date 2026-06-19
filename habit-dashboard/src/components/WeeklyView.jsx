import { getWeeklyHistory } from "../history";

function WeeklyView() {
  const history = getWeeklyHistory();

  const today = new Date();
  const week = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);

    const dateString = date
      .toISOString()
      .split("T")[0];

    const savedDay = history.find(
      (item) => item.date === dateString
    );

    week.push({
      day: date
        .toLocaleDateString("en-US", {
          weekday: "short",
        })
        .toUpperCase(),

      date: date.getDate(),

      progress: savedDay
        ? savedDay.percentage
        : 0,

      completed: savedDay
        ? savedDay.completed || 0
        : 0,

      total: savedDay
        ? savedDay.total || 0
        : 0,

      active:
        date.toDateString() ===
        today.toDateString(),
    });
  }

  const weeklyAverage = Math.round(
    week.reduce(
      (sum, day) => sum + day.progress,
      0
    ) / 7
  );

  const bestDay = Math.max(
    ...week.map((day) => day.progress)
  );

  const trackedDays = week.filter(
    (day) => day.progress > 0
  ).length;

  return (
    <div className="mt-8">
      <h2 className="text-3xl font-bold mb-6">
        Weekly Overview
      </h2>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-[#1c1c1c] border border-slate-700 rounded-2xl p-6">
          <p className="text-gray-400">
            Weekly Average
          </p>
          <h3 className="text-4xl font-bold mt-3">
            {weeklyAverage}%
          </h3>
        </div>

        <div className="bg-[#1c1c1c] border border-slate-700 rounded-2xl p-6">
          <p className="text-gray-400">
            Best Day
          </p>
          <h3 className="text-4xl font-bold mt-3">
            {bestDay}%
          </h3>
        </div>

        <div className="bg-[#1c1c1c] border border-slate-700 rounded-2xl p-6">
          <p className="text-gray-400">
            Days Tracked
          </p>
          <h3 className="text-4xl font-bold mt-3">
            {trackedDays}
          </h3>
        </div>
      </div>

      {/* Daily Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-7 gap-4">
        {week.map((item) => {
          const radius = 30;

          const circumference =
            2 * Math.PI * radius;

          const offset =
            circumference -
            (item.progress / 100) *
              circumference;

          return (
            <div
              key={`${item.day}-${item.date}`}
              className={`
                h-[240px]
                bg-[#1c1c1c]
                rounded-2xl
                border
                px-4
                py-5
                flex
                flex-col
                items-center
                justify-between
                transition-all
                duration-300
                hover:scale-105
                ${
                  item.active
                    ? "border-emerald-500 bg-gradient-to-b from-emerald-900/30 to-[#1c1c1c]"
                    : "border-slate-700"
                }
              `}
            >
              <div className="text-center">
                <p className="text-gray-400 font-semibold">
                  {item.day}
                </p>

                <p className="text-4xl font-bold">
                  {item.date}
                </p>

                {item.active && (
                  <p className="text-xs text-emerald-400">
                    Today
                  </p>
                )}
              </div>

              <div className="relative flex items-center justify-center w-[100px] h-[100px]">
                {item.progress > 0 ? (
                  <>
                    <svg
                      width="100"
                      height="100"
                      className="-rotate-90 absolute"
                    >
                      <circle
                        cx="50"
                        cy="50"
                        r={radius}
                        stroke="#374151"
                        strokeWidth="8"
                        fill="none"
                      />

                      <circle
                        cx="50"
                        cy="50"
                        r={radius}
                        stroke="#14b8a6"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={
                          circumference
                        }
                        strokeDashoffset={
                          offset
                        }
                        strokeLinecap="round"
                      />
                    </svg>

                    <div className="z-10 text-center">
                      <div className="text-base font-bold">
                        {item.progress}%
                      </div>

                      <div className="text-[11px] text-gray-400">
                        {item.total > 0
                          ? `${item.completed}/${item.total}`
                          : "Tracked"}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full border-4 border-slate-700 opacity-40 mx-auto" />
                    <p className="text-xs text-gray-500 mt-2">
                      Not tracked
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Weekly Trend */}
      <div className="mt-10 bg-[#1c1c1c] border border-slate-700 rounded-3xl p-6">
        <h3 className="text-2xl font-bold mb-8">
          Weekly Trend
        </h3>

        <div className="flex items-end justify-between h-72 px-4 border-b border-slate-700">
          {week.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-end h-full flex-1"
            >
              <span className="text-sm text-emerald-400 mb-2 font-semibold">
                {item.progress}%
              </span>

              {item.progress > 0 ? (
                <div
                  className="
                    w-12
                    rounded-t-xl
                    bg-gradient-to-t
                    from-emerald-600
                    to-emerald-300
                  "
                  style={{
                    height: `${Math.max(
                      item.progress * 2,
                      8
                    )}px`,
                  }}
                />
              ) : (
                <div className="w-12 h-1 bg-slate-700 rounded-full" />
              )}

              <span className="mt-3 text-gray-400">
                {item.day}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WeeklyView;
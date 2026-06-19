import { getHabitHistory } from "../habitHistory";

function HabitProgress() {
  const history = getHabitHistory();

  if (history.length === 0) {
    return null;
  }

  const habitStats = {};

  history.forEach((day) => {
    Object.entries(day.habits).forEach(
      ([habit, completed]) => {
        if (!habitStats[habit]) {
          habitStats[habit] = {
            completed: 0,
            total: 0,
          };
        }

        habitStats[habit].total++;

        if (completed) {
          habitStats[habit].completed++;
        }
      }
    );
  });

  const habits = Object.entries(
    habitStats
  ).map(([habit, stat]) => ({
    habit,
    percentage: Math.round(
      (stat.completed / stat.total) *
        100
    ),
  }));
  if (habits.length === 0) {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">
        Habit Performance
      </h2>

      <div className="bg-[#1c1c1c] border border-slate-700 rounded-2xl p-8 text-center">
        <p className="text-gray-400">
          No habit data available yet.
        </p>

        <p className="text-sm text-gray-500 mt-2">
          Complete some habits and check back tomorrow.
        </p>
      </div>
    </div>
  );
}

  const bestHabit = habits.reduce(
    (best, current) =>
      current.percentage >
      best.percentage
        ? current
        : best
  );

  const worstHabit = habits.reduce(
    (worst, current) =>
      current.percentage <
      worst.percentage
        ? current
        : worst
  );

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">
        Habit Performance
      </h2>

      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <div className="bg-[#1c1c1c] border border-slate-700 rounded-2xl p-5">
          <p className="text-gray-400">
            Most Consistent
          </p>

          <h3 className="text-2xl font-bold mt-2">
            🏆 {bestHabit.habit}
          </h3>

          <p className="text-green-400 mt-1">
            {bestHabit.percentage}%
          </p>
        </div>

        <div className="bg-[#1c1c1c] border border-slate-700 rounded-2xl p-5">
          <p className="text-gray-400">
            Needs Attention
          </p>

          <h3 className="text-2xl font-bold mt-2">
            ⚠️ {worstHabit.habit}
          </h3>

          <p className="text-red-400 mt-1">
            {worstHabit.percentage}%
          </p>
        </div>
      </div>

      <div className="space-y-5">
        {habits
          .sort(
            (a, b) =>
              b.percentage -
              a.percentage
          )
          .map((item) => (
            <div
              key={item.habit}
              className="bg-[#1c1c1c] border border-slate-700 rounded-xl p-4"
            >
              <div className="flex justify-between mb-2">
                <span className="font-medium">
                  {item.habit}
                </span>

                <span className="text-emerald-400 font-semibold">
                  {item.percentage}%
                </span>
              </div>

              <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-green-400"
                  style={{
                    width: `${item.percentage}%`,
                  }}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default HabitProgress;
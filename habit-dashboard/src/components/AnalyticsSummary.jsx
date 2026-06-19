import { getHabitHistory } from "../habitHistory";
import {
  calculateStreak,
  calculateBestStreak,
} from "../streak";

function AnalyticsSummary() {
  const history = getHabitHistory();

  if (history.length === 0) {
    return null;
  }

  const stats = {};

  history.forEach((day) => {
    Object.entries(day.habits).forEach(
      ([habit, completed]) => {
        if (!stats[habit]) {
          stats[habit] = {
            completed: 0,
            total: 0,
          };
        }

        stats[habit].total++;

        if (completed) {
          stats[habit].completed++;
        }
      }
    );
  });

  const habits = Object.entries(stats).map(
    ([name, stat]) => ({
      name,
      percentage: Math.round(
        (stat.completed /
          stat.total) *
          100
      ),
    })
  );

  const bestHabit = [...habits].sort(
    (a, b) =>
      b.percentage - a.percentage
  )[0];

  const habitsNeedingAttention =
  habits.filter(
    (habit) => habit.percentage < 100
  );

const worstHabit =
  habitsNeedingAttention.length > 0
    ? [...habitsNeedingAttention].sort(
        (a, b) =>
          a.percentage - b.percentage
      )[0]
    : null;

  const overallRate = Math.round(
    habits.reduce(
      (sum, h) =>
        sum + h.percentage,
      0
    ) / habits.length
  );

  const currentStreak =
    calculateStreak();

  const bestStreak =
    calculateBestStreak();

  return (
    <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-10">
      <div className="bg-[#1c1c1c] border border-slate-700 rounded-xl p-5">
        <p className="text-gray-400">
          🏆 Best Habit
        </p>

        <h3 className="text-lg font-bold mt-2">
          {bestHabit?.name}
        </h3>

        <p className="text-green-400">
          {bestHabit?.percentage}%
        </p>
      </div>

     <div className="bg-[#1c1c1c] border border-slate-700 rounded-xl p-5">
  <p className="text-gray-400">
    ⚠️ Attention
  </p>

  {worstHabit ? (
    <>
      <h3 className="text-lg font-bold mt-2">
        {worstHabit.name}
      </h3>

      <p className="text-red-400">
        {worstHabit.percentage}%
      </p>
    </>
  ) : (
    <>
      <h3 className="text-lg font-bold mt-2 text-emerald-400">
        None 🎉
      </h3>

      <p className="text-gray-400 text-sm">
        All habits completed
      </p>
    </>
  )}
</div>

      <div className="bg-[#1c1c1c] border border-slate-700 rounded-xl p-5">
        <p className="text-gray-400">
          📅 Days
        </p>

        <h3 className="text-3xl font-bold mt-2">
          {history.length}
        </h3>
      </div>

      <div className="bg-[#1c1c1c] border border-slate-700 rounded-xl p-5">
        <p className="text-gray-400">
          🎯 Success
        </p>

        <h3 className="text-3xl font-bold mt-2">
          {overallRate}%
        </h3>
      </div>

      <div className="bg-[#1c1c1c] border border-slate-700 rounded-xl p-5">
        <p className="text-gray-400">
          🔥 Current
        </p>

        <h3 className="text-3xl font-bold mt-2">
          {currentStreak}
        </h3>
      </div>

      <div className="bg-[#1c1c1c] border border-slate-700 rounded-xl p-5">
        <p className="text-gray-400">
          🏆 Record
        </p>

        <h3 className="text-3xl font-bold mt-2">
          {bestStreak}
        </h3>
      </div>
    </div>
  );
}

export default AnalyticsSummary;
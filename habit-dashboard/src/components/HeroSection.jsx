import ProgressRing from "./ProgressRing";

function HeroSection({
  completedCount,
  totalHabits,
  percentage,
  streak,
  bestStreak,
}) {
  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) {
    greeting = "Good Morning";
  } else if (hour < 18) {
    greeting = "Good Afternoon";
  }

  return (
    <div className="mb-8 bg-[#1c1c1c] border border-slate-700 rounded-3xl p-8">
      <h1 className="text-4xl font-bold mb-2">
        {greeting} 👋
      </h1>

      <p className="text-gray-400 mb-8">
        Keep showing up. Consistency wins.
      </p>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        <ProgressRing percentage={percentage} />

        <div className="space-y-6">
          <div>
            <p className="text-gray-400">
              Completed Today
            </p>

            <h2 className="text-5xl font-bold">
              {completedCount}/{totalHabits}
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
  <div>
    <p className="text-gray-400">
      Current Streak
    </p>

    <h2 className="text-4xl font-bold">
      🔥 {streak}
    </h2>
  </div>

  <div>
    <p className="text-gray-400">
      Best Streak
    </p>

    <h2 className="text-4xl font-bold">
      🏆 {bestStreak}
    </h2>
  </div>
</div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
function HabitCard({
  habit,
  toggleHabit,
  deleteHabit,
  cardColor,
  borderColor,
}) {
  const getHabitIcon = (habitName) => {
    const name = habitName.toLowerCase();

    if (
      name.includes("gym") ||
      name.includes("workout") ||
      name.includes("fitness")
    )
      return "🏋️";

    if (
      name.includes("dsa") ||
      name.includes("code") ||
      name.includes("program")
    )
      return "💻";

    if (
      name.includes("ai") ||
      name.includes("ml")
    )
      return "🤖";

    if (
      name.includes("project")
    )
      return "🚀";

    if (
      name.includes("content") ||
      name.includes("youtube")
    )
      return "🎬";

    if (
      name.includes("read") ||
      name.includes("book")
    )
      return "📚";

    if (
      name.includes("meditation")
    )
      return "🧘";

    if (
      name.includes("water")
    )
      return "💧";

    return "";
  };

  const icon = getHabitIcon(habit.name);

  return (
    <div
      style={{
        background: cardColor,
        border: `1px solid ${borderColor}`,
      }}
      className={`
        max-w-5xl
        mx-auto
        mb-4
        px-6
        py-5
        rounded-3xl
        flex
        items-center
        justify-between
        hover:scale-[1.02]
        hover:shadow-xl
        transition-all
        duration-300
        ${
          habit.completed
            ? "ring-2 ring-green-500"
            : ""
        }
      `}
    >
      <div className="flex items-center gap-4">
        <input
          type="checkbox"
          checked={habit.completed}
          onChange={() =>
            toggleHabit(habit.id)
          }
          className="
            w-6
            h-6
            cursor-pointer
            accent-green-500
          "
        />

        <span
          className={`text-2xl font-semibold transition-all ${
            habit.completed
              ? "line-through text-green-400"
              : ""
          }`}
        >
          {icon && `${icon} `}
          {habit.name}
        </span>
      </div>

      <button
        onClick={() =>
          deleteHabit(habit.id)
        }
        className="
          px-6
          py-2
          rounded-xl
          border
          border-slate-600
          hover:bg-red-500
          hover:border-red-500
          transition
        "
      >
        Delete
      </button>
    </div>
  );
}

export default HabitCard;
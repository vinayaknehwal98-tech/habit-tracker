export function saveHabitHistory(habits) {
const today = new Date().toLocaleDateString(
  "en-CA",
  {
    timeZone: "Asia/Kolkata",
  }
);

  const existing =
    JSON.parse(
      localStorage.getItem(
        "habitHistory"
      )
    ) || [];

  const entry = {
    date: today,
    habits: habits.reduce(
      (acc, habit) => {
        acc[habit.name] =
          habit.completed;

        return acc;
      },
      {}
    ),
  };

  const filtered =
    existing.filter(
      (item) =>
        item.date !== today
    );

  filtered.push(entry);

  localStorage.setItem(
    "habitHistory",
    JSON.stringify(filtered)
  );
}

export function getHabitHistory() {
  return (
    JSON.parse(
      localStorage.getItem(
        "habitHistory"
      )
    ) || []
  );
}
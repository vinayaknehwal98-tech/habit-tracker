export function saveDailyProgress(
  percentage,
  completed,
  total
) {
  const today = new Date().toLocaleDateString(
  "en-CA",
  {
    timeZone: "Asia/Kolkata",
  }
);

  const history =
    JSON.parse(
      localStorage.getItem(
        "weeklyHistory"
      )
    ) || [];

  const existing =
    history.find(
      (item) =>
        item.date === today
    );

  if (existing) {
    existing.percentage =
      percentage;

    existing.completed =
      completed;

    existing.total = total;
  } else {
    history.push({
      date: today,
      percentage,
      completed,
      total,
    });
  }

  localStorage.setItem(
    "weeklyHistory",
    JSON.stringify(history)
  );
}

export function getWeeklyHistory() {
  return (
    JSON.parse(
      localStorage.getItem(
        "weeklyHistory"
      )
    ) || []
  );
}
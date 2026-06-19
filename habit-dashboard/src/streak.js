export function calculateStreak() {
  const history =
    JSON.parse(
      localStorage.getItem("weeklyHistory")
    ) || [];

  if (history.length === 0) {
    return 0;
  }

  const sorted = [...history].sort(
    (a, b) =>
      new Date(b.date) -
      new Date(a.date)
  );

  let streak = 0;

  let currentDate = new Date(
    sorted[0].date
  );

  for (const day of sorted) {
    const dayDate = new Date(day.date);

    const diff = Math.floor(
      (currentDate - dayDate) /
        (1000 * 60 * 60 * 24)
    );

    if (
  diff === 0 &&
  day.completed === day.total &&
  day.total > 0
) {
      streak++;
    } else if (
  diff === 1 &&
  day.completed === day.total &&
  day.total > 0
) {
      streak++;
      currentDate = dayDate;
    } else {
      break;
    }
  }

  return streak;
}

export function calculateBestStreak() {
  const history =
    JSON.parse(
      localStorage.getItem("weeklyHistory")
    ) || [];

  if (history.length === 0) {
    return 0;
  }

  const sorted = [...history].sort(
    (a, b) =>
      new Date(a.date) -
      new Date(b.date)
  );

  let current = 0;
  let best = 0;

  for (const day of sorted) {
    if (
  day.completed === day.total &&
  day.total > 0
){
      current++;
      best = Math.max(
        best,
        current
      );
    } else {
      current = 0;
    }
  }

  return best;
}
import { useState, useEffect } from "react";
import { saveHabitHistory } from "./habitHistory";

import Header from "./components/Header";
import StatCard from "./components/StatCard";
import HabitCard from "./components/HabitCard";
import HeroSection from "./components/HeroSection";

import WeeklyView from "./components/WeeklyView";
import TasksView from "./components/TasksView";
import AnalyticsView from "./components/AnalyticsView";
import DailyNotes from "./components/DailyNotes";

import { saveDailyProgress } from "./history";
import {
  calculateStreak,
  calculateBestStreak,
} from "./streak";

function App() {
  const [activeTab, setActiveTab] =
    useState("Today");

  const [darkMode, setDarkMode] =
    useState(true);

  const [habits, setHabits] = useState(() => {
    const saved =
      localStorage.getItem("habits");

    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            name: "Gym",
            completed: false,
          },
          {
            id: 2,
            name: "DSA",
            completed: false,
          },
          {
            id: 3,
            name: "AI/ML",
            completed: false,
          },
          {
            id: 4,
            name: "Project Work",
            completed: false,
          },
          {
            id: 5,
            name: "Content Creation",
            completed: false,
          },
          {
            id: 6,
            name: "Reading",
            completed: false,
          },
        ];
  });

  useEffect(() => {
  const today = new Date()
    .toISOString()
    .split("T")[0];

  const lastReset =
    localStorage.getItem(
      "lastResetDate"
    );

  if (lastReset !== today) {
    setHabits((prev) =>
      prev.map((habit) => ({
        ...habit,
        completed: false,
      }))
    );

    localStorage.setItem(
      "lastResetDate",
      today
    );
  }
}, []);

  const [newHabit, setNewHabit] =
    useState("");

  const [streak, setStreak] =
  useState(0);
  const [bestStreak, setBestStreak] =
  useState(0);

  const [history, setHistory] =
    useState(() => {
      const saved =
        localStorage.getItem(
          "weeklyHistory"
        );

      return saved
        ? JSON.parse(saved)
        : [];
    });

  useEffect(() => {
  localStorage.setItem(
    "habits",
    JSON.stringify(habits)
  );

  const completedCount =
    habits.filter(
      (habit) => habit.completed
    ).length;

  const percentage =
    habits.length > 0
      ? Math.round(
          (completedCount /
            habits.length) *
            100
        )
      : 0;

  saveDailyProgress(
  percentage,
  completedCount,
  habits.length
);

  saveHabitHistory(habits);

  const updatedHistory =
    JSON.parse(
      localStorage.getItem(
        "weeklyHistory"
      )
    ) || [];

  setHistory(updatedHistory);
}, [habits]);

useEffect(() => {
  setStreak(
    calculateStreak()
  );

  setBestStreak(
    calculateBestStreak()
  );
}, [history]);

  const completedCount = habits.filter(
    (habit) => habit.completed
  ).length;

  const percentage =
    habits.length > 0
      ? Math.round(
          (completedCount /
            habits.length) *
            100
        )
      : 0;

  const toggleHabit = (id) => {
    setHabits(
      habits.map((habit) =>
        habit.id === id
          ? {
              ...habit,
              completed:
                !habit.completed,
            }
          : habit
      )
    );
  };

  const addHabit = () => {
    if (!newHabit.trim()) return;

    setHabits([
      ...habits,
      {
        id: Date.now(),
        name: newHabit,
        completed: false,
      },
    ]);

    setNewHabit("");
  };

  const deleteHabit = (id) => {
    if (
      !window.confirm(
        "Delete this habit?"
      )
    ) {
      return;
    }

    setHabits(
      habits.filter(
        (habit) => habit.id !== id
      )
    );
  };

  const bgColor = darkMode
    ? "#111111"
    : "#f8fafc";

  const textColor = darkMode
    ? "#ffffff"
    : "#0f172a";

  const cardColor = darkMode
    ? "#1c1c1c"
    : "#ffffff";

  const borderColor = darkMode
    ? "#333333"
    : "#cbd5e1";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: bgColor,
        color: textColor,
      }}
      className="px-6 py-10"
    >
      <div className="max-w-5xl mx-auto">
        <div className="relative">
          <div className="absolute right-0 top-0">
            <button
              onClick={() =>
                setDarkMode(!darkMode)
              }
              className="
                px-4
                py-2
                rounded-xl
                border
                border-slate-600
                hover:bg-slate-800
                transition
              "
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
          </div>

          <Header
            activeTab={activeTab}
            setActiveTab={
              setActiveTab
            }
          />
        </div>

        {activeTab === "Today" && (
          <>
        <HeroSection
  completedCount={completedCount}
  totalHabits={habits.length}
  percentage={percentage}
  streak={streak}
  bestStreak={bestStreak}
/>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard
                title="Completed"
                value={completedCount}
                cardColor={cardColor}
                borderColor={
                  borderColor
                }
                textColor={textColor}
              />

              <StatCard
                title="Remaining"
                value={
                  habits.length -
                  completedCount
                }
                cardColor={cardColor}
                borderColor={
                  borderColor
                }
                textColor={textColor}
              />

              <StatCard
                title="Total"
                value={habits.length}
                cardColor={cardColor}
                borderColor={
                  borderColor
                }
                textColor={textColor}
              />

              <StatCard
                title="Day Streak"
                value={streak}
                cardColor={cardColor}
                borderColor={
                  borderColor
                }
                textColor={textColor}
              />
            </div>

            
            <div className="mt-12 flex justify-center">
              <div className="flex w-full max-w-4xl gap-3">
                <input
                  type="text"
                  value={newHabit}
                  onChange={(e) =>
                    setNewHabit(
                      e.target.value
                    )
                  }
                  placeholder="Enter a new habit"
                  className="
                    flex-1
                    px-6
                    py-3
                    rounded-xl
                    bg-[#2a2a2a]
                    border
                    border-[#444]
                    text-white
                    placeholder:text-gray-500
                    outline-none
                  "
                />

                <button
                  onClick={addHabit}
                  className="
                    px-8
                    py-3
                    rounded-xl
                    border
                    border-[#555]
                    bg-transparent
                    hover:bg-green-500
                    transition
                  "
                >
                  Add habit
                </button>
              </div>
            </div>

            <div className="mt-8">
              {habits.map((habit) => (
                <HabitCard
                  key={habit.id}
                  habit={habit}
                  toggleHabit={
                    toggleHabit
                  }
                  deleteHabit={
                    deleteHabit
                  }
                  cardColor={cardColor}
                  borderColor={
                    borderColor
                  }
                />
              ))}
            </div>
       

<DailyNotes />
          </>
        )}
      
        {activeTab ===
          "This Week" && (
          <WeeklyView />
        )}

        {activeTab === "Tasks" && (
          <TasksView />
        )}

        {activeTab ===
          "Analytics" && (
          <AnalyticsView
            history={history}
          />
        )}
      </div>
    </div>
  );
}

export default App;
import { useState, useEffect } from "react";

function TasksView() {
  const [tasks, setTasks] = useState(() => {
    const saved =
      localStorage.getItem("tasks");

    return saved
      ? JSON.parse(saved)
      : {};
  });

  const [inputs, setInputs] = useState({});

  useEffect(() => {
    localStorage.setItem(
      "tasks",
      JSON.stringify(tasks)
    );
  }, [tasks]);

  const days = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date();

    date.setDate(
      new Date().getDate() + i
    );

    const key = date
      .toISOString()
      .split("T")[0];

    days.push({
      key,
      label:
        date.toLocaleDateString(
          "en-US",
          {
            weekday: "short",
          }
        ) +
        " " +
        date.getDate() +
        "/" +
        (date.getMonth() + 1),
    });
  }

  const addTask = (dayKey) => {
    const text = inputs[dayKey];

    if (!text?.trim()) return;

    setTasks({
      ...tasks,
      [dayKey]: [
        ...(tasks[dayKey] || []),
        {
          id: Date.now(),
          text,
          completed: false,
        },
      ],
    });

    setInputs({
      ...inputs,
      [dayKey]: "",
    });
  };

  const toggleTask = (
    dayKey,
    taskId
  ) => {
    setTasks({
      ...tasks,
      [dayKey]: tasks[dayKey].map(
        (task) =>
          task.id === taskId
            ? {
                ...task,
                completed:
                  !task.completed,
              }
            : task
      ),
    });
  };

  const deleteTask = (
    dayKey,
    taskId
  ) => {
    setTasks({
      ...tasks,
      [dayKey]: tasks[dayKey].filter(
        (task) =>
          task.id !== taskId
      ),
    });
  };

  return (
    <div className="mt-8">
      <h2 className="text-3xl font-bold mb-8">
        Tasks
      </h2>

      {days.map((day) => (
        <div
          key={day.key}
          className="mb-8 bg-[#1c1c1c] border border-slate-700 rounded-2xl p-5"
        >
          <h3 className="text-xl font-semibold mb-4">
            {day.label}
          </h3>

          <div className="flex gap-3 mb-4">
            <input
              type="text"
              value={
                inputs[day.key] || ""
              }
              onChange={(e) =>
                setInputs({
                  ...inputs,
                  [day.key]:
                    e.target.value,
                })
              }
              placeholder="Add task..."
              className="
                flex-1
                px-4
                py-3
                rounded-xl
                bg-[#2a2a2a]
                border
                border-[#444]
              "
            />

            <button
              onClick={() =>
                addTask(day.key)
              }
              className="
                px-6
                py-3
                rounded-xl
                border
                border-slate-600
                hover:bg-green-500
                transition
              "
            >
              Add
            </button>
          </div>

          {(tasks[day.key] || []).map(
            (task) => (
              <div
                key={task.id}
                className="
                  flex
                  justify-between
                  items-center
                  py-2
                "
              >
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={
                      task.completed
                    }
                    onChange={() =>
                      toggleTask(
                        day.key,
                        task.id
                      )
                    }
                  />

                  <span
                    className={
                      task.completed
                        ? "line-through text-gray-500"
                        : ""
                    }
                  >
                    {task.text}
                  </span>
                </label>

                <button
                  onClick={() =>
                    deleteTask(
                      day.key,
                      task.id
                    )
                  }
                  className="text-red-400"
                >
                  Delete
                </button>
              </div>
            )
          )}
        </div>
      ))}
    </div>
  );
}

export default TasksView;
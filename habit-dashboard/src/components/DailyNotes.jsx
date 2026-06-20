import { useState, useEffect } from "react";

function DailyNotes() {
  const today = new Date().toLocaleDateString(
  "en-CA",
  {
    timeZone: "Asia/Kolkata",
  }
);

  const [note, setNote] = useState("");

  useEffect(() => {
    const savedNotes =
      JSON.parse(
        localStorage.getItem(
          "dailyNotes"
        )
      ) || {};

    setNote(savedNotes[today] || "");
  }, [today]);

  const saveNote = (value) => {
    setNote(value);

    const savedNotes =
      JSON.parse(
        localStorage.getItem(
          "dailyNotes"
        )
      ) || {};

    savedNotes[today] = value;

    localStorage.setItem(
      "dailyNotes",
      JSON.stringify(savedNotes)
    );
  };

  return (
    <div className="mt-12 bg-[#1c1c1c] border border-slate-700 rounded-3xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">
          📝 Daily Notes
        </h2>

        <span className="text-sm text-gray-400">
          {note.length}/500
        </span>
      </div>

      <textarea
        value={note}
        maxLength={500}
        onChange={(e) =>
          saveNote(e.target.value)
        }
        placeholder="Write about your day, wins, mistakes, ideas..."
        className="
          w-full
          h-40
          bg-[#111]
          border
          border-slate-700
          rounded-2xl
          p-4
          text-white
          resize-none
          outline-none
          focus:border-emerald-500
        "
      />

      <p className="text-gray-500 text-sm mt-3">
        Notes are automatically saved.
      </p>
    </div>
  );
}

export default DailyNotes;
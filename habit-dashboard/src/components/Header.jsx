function Header({ activeTab, setActiveTab }) {
  return (
    <div className="text-center mb-10">
      <h1 className="text-5xl font-bold">
        ⦿ Habit Dashboard
      </h1>

      <p className="mt-2 text-gray-400">
        {new Date().toLocaleDateString("en-GB", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>

      <div className="flex justify-center gap-3 mt-8">
        {["Today", "This Week", "Tasks", "Analytics"].map(
          (tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-xl border transition ${
                activeTab === tab
                  ? "border-slate-500 bg-slate-800"
                  : "border-slate-700"
              }`}
            >
              {tab}
            </button>
          )
        )}
      </div>
    </div>
  );
}

export default Header;
function ProgressRing({ percentage }) {
  const radius = 70;

  const circumference =
    2 * Math.PI * radius;

  const offset =
    circumference -
    (percentage / 100) *
      circumference;

  return (
    <div className="flex justify-center">
      <div className="relative">
        <svg
          width="180"
          height="180"
          className="-rotate-90"
        >
          <circle
            cx="90"
            cy="90"
            r={radius}
            stroke="#333"
            strokeWidth="14"
            fill="none"
          />

          <circle
            cx="90"
            cy="90"
            r={radius}
            stroke="#22c55e"
            strokeWidth="14"
            fill="none"
            strokeDasharray={
              circumference
            }
            strokeDashoffset={
              offset
            }
            strokeLinecap="round"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h2 className="text-5xl font-bold">
            {percentage}%
          </h2>

          <p className="text-gray-400">
            Complete
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProgressRing;
function StatCard({
  title,
  value,
  cardColor,
  borderColor,
  textColor,
}) {
  return (
    <div
      style={{
        background: cardColor,
        border: `1px solid ${borderColor}`,
        color: textColor,
      }}
      className="
        rounded-2xl
        h-32
        flex
        flex-col
        items-center
        justify-center
        text-center
      "
    >
      <h2 className="text-5xl font-bold mb-2">
        {value}
      </h2>

      <p className="text-gray-400 text-lg">
        {title}
      </p>
    </div>
  );
}

export default StatCard;
import Heatmap from "./Heatmap";
import HabitProgress from "./HabitProgress";
import HistoryChart from "./HistoryChart";
import AnalyticsSummary from "./AnalyticsSummary";

function AnalyticsView({ history }) {
  return (
    <div className="mt-8 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">
        Analytics
      </h1>

      <AnalyticsSummary />

      <Heatmap history={history} />

      <HabitProgress />

      <HistoryChart history={history} />
    </div>
  );
}

export default AnalyticsView;
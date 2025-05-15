import InfoData from "./dashbord/InfoData";
import RevenueChart from "./dashbord/RevenueChart";

const Dashboard = () => {
  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 sm:p-6 dark:bg-gray-800">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:gap-6">
        <InfoData />
      </div>
      <RevenueChart />
    </div>
  );
};

export default Dashboard;

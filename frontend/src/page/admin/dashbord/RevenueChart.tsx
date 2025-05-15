import { CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { SERVER_HOST } from "../../../config/Url";
import axios from "axios";

type DailyRevenue = {
  date: string; // "yyyy-MM-dd"
  total: number;
};

const RevenueChart = () => {
  const [data, setData] = useState<DailyRevenue[]>([]);
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
  const [year, setYear] = useState<number>(new Date().getFullYear());

  const generateFullMonthDates = (year: number, month: number) => {
    const daysInMonth = new Date(year, month, 0).getDate();
    const dates: string[] = [];
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month - 1, day);
      dates.push(date.toLocaleDateString("sv-SE")); // yyyy-MM-dd
    }
    return dates;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${SERVER_HOST}/dash-board/daily-revenue?month=${month}&year=${year}`);
        const rawData = response.data.data;
        const fullDates = generateFullMonthDates(year, month);
        const mapData = new Map(rawData.map((item: any) => [item.date, item.total]));
        const completedData: any = fullDates.map((date) => ({
          date,
          total: mapData.get(date) || 0,
        }));
        setData(completedData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [month, year]);

  return (
    <Card className="mt-6">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <CardTitle>Doanh thu từng ngày</CardTitle>
        <div className="flex gap-2">
          <select value={month} onChange={(e) => setMonth(parseInt(e.target.value))} className="border px-2 py-1 rounded">
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                Tháng {i + 1}
              </option>
            ))}
          </select>
          <select value={year} onChange={(e) => setYear(parseInt(e.target.value))} className="border px-2 py-1 rounded">
            {Array.from({ length: 5 }, (_, i) => {
              const y = new Date().getFullYear() - i;
              return (
                <option key={y} value={y}>
                  Năm {y}
                </option>
              );
            })}
          </select>
        </div>
      </CardHeader>

      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              fontSize={13}
              dataKey="date"
              tickFormatter={(date) => {
                const d = new Date(date);
                return `${d.getDate()}/${d.getMonth() + 1}`;
              }}
            />
            <YAxis fontSize={13} tickFormatter={(value) => `${value.toLocaleString()}đ`} />
            <Tooltip formatter={(value: number) => `${value.toLocaleString()}đ`} />
            <Bar dataKey="total" fill="#4F46E5" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default RevenueChart;

import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function OrdersChart({ data }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">
        Weekly Orders Overview
      </h2>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="week" />
          <Tooltip />
          <Line type="monotone" dataKey="orders" stroke="#000" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
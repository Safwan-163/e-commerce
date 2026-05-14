export default function StatCard({ title, value }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition">
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="text-2xl font-semibold mt-2">{value}</h2>
    </div>
  );
}
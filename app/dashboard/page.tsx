export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>

      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded shadow">Card 1</div>
        <div className="p-4 bg-white rounded shadow">Card 2</div>
        <div className="p-4 bg-white rounded shadow">Card 3</div>
      </div>
    </div>
  );
}
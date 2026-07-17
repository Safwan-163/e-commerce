function Topbar() {
  return (
    <div className="w-full bg-white border-b px-6 py-3 flex items-center justify-between">

      {/* Left */}
      <h2 className="text-lg font-medium">Dashboard</h2>

      {/* Right */}
      <div className="flex items-center gap-4">

        {/* Search */}
        <input
          type="text"
          placeholder="Search..."
          className="hidden md:block px-3 py-1.5 rounded-full bg-gray-100 text-sm outline-none"
        />

        {/* Profile */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-gray-300"></div>
          <span className="text-sm">John</span>
        </div>

      </div>
    </div>
  );
}
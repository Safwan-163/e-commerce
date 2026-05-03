export default function Categories() {
  const categories = ["Fashion", "Home", "Beauty", "Sports"];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {categories.map((cat, index) => (
        <div
          key={index}
          className="h-32 bg-gray-200 flex items-center justify-center rounded-xl font-bold"
        >
          {cat}
        </div>
      ))}
    </div>
  );
}
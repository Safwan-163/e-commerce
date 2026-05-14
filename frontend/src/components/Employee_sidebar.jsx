import { Link } from "react-router-dom";

export default function EmployeeSidebar() {
  return (
    <div className="w-64 bg-white shadow-md h-screen p-5">
      <h2 className="text-xl font-bold mb-6">Employee Panel</h2>

      <ul className="space-y-4">
        <li>
          <Link to="/employee" className="hover:text-blue-500">
            Dashboard
          </Link>
        </li>

        <li>
          <Link to="/employee/add-product" className="hover:text-blue-500">
            Add Product
          </Link>
        </li>

        <li>
          <Link to="/employee/update-product" className="hover:text-blue-500">
            Update Product
          </Link>
        </li>

        <li>
          <Link to="/employee/delete-product" className="hover:text-blue-500">
            Delete Product
          </Link>
        </li>
      </ul>
    </div>
  );
}
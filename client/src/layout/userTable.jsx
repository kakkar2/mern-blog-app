const UserTable = () => {
  return (
    <table className="min-w-full divide-y divide-gray-200 border">
      <thead>
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Name
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Email
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Role
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Status
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Action
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        <tr>
          <td className="px-6 py-4 whitespace-nowrap">Jane Doe</td>
          <td className="px-6 py-4 whitespace-nowrap">jane@example.com</td>
          <td className="px-6 py-4 whitespace-nowrap">Admin</td>
          <td className="px-6 py-4 whitespace-nowrap">
            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
              Active
            </span>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <button className="px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={18}
                height={18}
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path>
                <polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon>
              </svg>
            </button>
            <button className="ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={18}
                height={18}
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
              </svg>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default UserTable;

import { useEffect, useState } from "react";
import { UserTable } from "../layout";
import { handleGETData } from "../data/server";
import { TableSkeleton } from "../components";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    handleGETData("/user/").then((result) => setUsers(result.data));
  }, []);

  return users ? (
    <div>
      <div className="flex items-center justify-between py-2 mb-5">
        <h2 className="font-semibold uppercase text-xl underline cursor-default">
          Users
        </h2>
      </div>
      <UserTable users={users} />
    </div>
  ) : (
    <TableSkeleton />
  );
};

export default Users;

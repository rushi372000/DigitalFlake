import { useEffect, useState, useMemo } from "react";
import { useTable } from "react-table";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegPenToSquare } from "react-icons/fa6";
import DeleteModal from "../../components/DeleteModal";
import axiosInstance from "../../axios";
import { CiSearch } from "react-icons/ci";
import { FaSort } from "react-icons/fa";

const Users = ({ openSubpage }) => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);

  // Fetch users data
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get("/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error while fetching the Users: ", error);
      }
    };
    fetchUsers();
  }, []);

  // Delete User
  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/users/${deleteUserId}`);
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user._id !== deleteUserId)
      );
      alert("User deleted successfully.");
    } catch (error) {
      console.error("Error deleting user: ", error);
      alert("Failed to delete the user.");
    } finally {
      setIsModalOpen(false);
      setDeleteUserId(null);
    }
  };

  // Open delete confirmation modal
  const openDeleteModal = (userId) => {
    setIsModalOpen(true);
    setDeleteUserId(userId);
  };

  // Define table columns
  const columns = useMemo(
    () => [
      { Header: "ID", accessor: "id" },
      { Header: "Name", accessor: "name" },
      { Header: "Mobile", accessor: "mobile" },
      { Header: "Email", accessor: "email" },
      { Header: "Role", accessor: "role" },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ cell }) => {
          // Get the status value
          const status = cell.value;

          // Define style based on status value
          const statusStyle = {
            color: status === "Active" ? "green" : "red",
            fontWeight: "bold",
          };

          return <span style={statusStyle}>{status}</span>;
        },
      },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <div>
            {/* Edit Button */}
            {console.log("row 61 => ", row.original._id)}
            <button
              className="btn"
              style={{ color: "grey" }}
              onClick={() => openSubpage("UpdateUsers", row.original._id)}
            >
              <FaRegPenToSquare />
            </button>

            {/* Delete Button */}
            <button
              className="btn"
              style={{ color: "grey" }}
              onClick={() => openDeleteModal(row.original._id)}
            >
              <RiDeleteBin6Line />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: users });

  return (
    <div>
      <div className="d-flex justify-content-between mb-3">
        <div className="user d-flex justify-content-between">
          <img
            src="/UserIcon.png"
            alt="User Icon"
            style={{
              width: "42px",
              height: "42px",
              top: "154px",
              left: "34px",
              marginRight: "10px",
            }}
          />
          <h3>User</h3>
        </div>
        <div>
          <CiSearch />
          <input
            type="text"
            style={{
              position: "absolute",
              width: "534px",
              height: "43px",
              top: "132px",
              left: "554px",
              gap: "0px",
              borderRadius: "10px",
              border: "1px solid #9D9D9D",
              opacity: "1",
            }}
          />
        </div>

        <button
          style={{
            background: "#662671",
            color: "white",
            padding: "8px 16px",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
          }}
          onClick={() => openSubpage("AddUsers")}
        >
          Add User
        </button>
      </div>

      {/* Users Table */}
      <table
        {...getTableProps()}
        className="table table-striped table-bordered"
        style={{ textAlign: "center" }}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  key={column.id}
                  {...column.getHeaderProps()}
                  style={{ background: "#FFF8B7" }}
                >
                  {column.render("Header") &&
                  column.render("Header") !== "Actions" ? (
                    <>
                      {column.render("Header")}
                      <FaSort style={{ color: "grey" }} />
                    </>
                  ) : (
                    column.render("Header")
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.length > 0 ? (
            rows.map((row) => {
              prepareRow(row);
              return (
                <tr key={row.id} {...row.getRowProps()}>
                  {console.log("row 128 => ", row)}
                  {row.cells.map((cell) => (
                    <td key={cell.id} {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                style={{ textAlign: "center", padding: "20px" }}
              >
                No Users Found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default Users;
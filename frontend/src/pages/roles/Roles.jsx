import { useEffect, useState, useMemo } from "react";
import { useTable } from "react-table";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegPenToSquare } from "react-icons/fa6";
import DeleteModal from "../../components/DeleteModal";
import axiosInstance from "../../axios";
import { FaSort } from "react-icons/fa";

const Roles = ({ openSubpage }) => {
  const [roles, setRoles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteRoleId, setDeleteRoleId] = useState(null);

  // Fetch roles data on component mount
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axiosInstance.get("/role");
        setRoles(response.data);
      } catch (error) {
        console.log("Error while fetching the Roles: ", error);
      }
    };
    fetchRoles();
  }, []);

  // Delete Role
  const handleDelete = async (roleId) => {
    try {
      await axiosInstance.delete(`/role/${deleteRoleId}`);
      setRoles((prevRoles) => prevRoles.filter((role) => role.id !== roleId));
      alert("Role deleted successfully.");
    } catch (error) {
      console.log("Error deleting role: ", error);
      alert("Failed to delete the role.");
    } finally {
      setIsModalOpen(false);
      setDeleteRoleId(null);
    }
  };

  const openDeleteModal = (roleId) => {
    setIsModalOpen(true);
    setDeleteRoleId(roleId);
  };

  // Define table columns
  const columns = useMemo(
    () => [
      { Header: "ID", accessor: "id" },
      { Header: "Role Name", accessor: "name" },
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
            {/* Update Button */}
            <button
              className="btn"
              style={{ color: "grey" }}
              onClick={() => openSubpage("UpdateRoles", row.original._id)}
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

  // React Table instance
  const tableInstance = useTable({ columns, data: roles });

  // Destructure React Table properties
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div>
      <div className="role d-flex justify-content-between">
        <div className="role d-flex justify-content-between">
          <img
            src="/RolesIcon.png"
            alt="Roles Icons"
            style={{
              width: "42px",
              height: "42px",
              top: "132px",
              left: "404px",
            }}
          />
          <h3>Roles</h3>
        </div>
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

        {/* Add Role Button */}
        <button
          style={{
            width: "116px",
            height: "48px",
            position: "absolute",
            top: "129px",
            left: "1275px",
            background: "#662671",
            color: "white",
            borderRadius: "10px",
            opacity: "1",
          }}
          onClick={() => openSubpage("AddRoles")}
        >
          Add Roles
        </button>
      </div>

      {/* Roles Table */}
      <div className="mt-3">
        <table
          {...getTableProps()}
          className="table table-striped table-bordered"
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
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr key={row.id} {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td key={cell.column.id} {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Delete Confirmation Modal */}
        <DeleteModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleDelete}
        />
      </div>
    </div>
  );
};

export default Roles;

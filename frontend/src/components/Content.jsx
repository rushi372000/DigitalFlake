import { useState } from "react";
import Roles from "../pages/roles/Roles.jsx";
import HomePage from "../pages/HomePage.jsx";
import Users from "../pages/users/Users.jsx";
import AddRoles from "../pages/roles/AddRoles.jsx";
import UpdateRoles from "../pages/roles/UpdateRoles.jsx";
import AddUsers from "../pages/users/AddUsers.jsx";
import UpdateUsers from "../pages/users/UpdateUsers.jsx";

const Content = ({ selectedPage }) => {
  const [activeSubpage, setActiveSubpage] = useState(null);
  const [selectedRoleId, setSelectedRoleId] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);

  //Manage the subpages of content component
  const openSubpage = (subpage, id = null) => {
    setActiveSubpage(subpage);
    if (subpage === "UpdateRoles") {
      setSelectedRoleId(id);
    }
    if (subpage === "UpdateUsers") {
      setSelectedUserId(id);
    }
  };

  //Close subpage of content component
  const closeSubpage = () => {
    setActiveSubpage(null);
    setSelectedRoleId(null);
    setSelectedUserId(null);
  };

  return (
    <div className="p-4">
      {/* Conditionally Render Subpages */}

      {/* Subpages of Roles & Users */}
      {activeSubpage === "AddRoles" && <AddRoles onClose={closeSubpage} />}
      {activeSubpage === "UpdateRoles" && (
        <UpdateRoles roleId={selectedRoleId} onClose={closeSubpage} />
      )}
      {activeSubpage === "AddUsers" && <AddUsers onClose={closeSubpage} />}
      {activeSubpage === "UpdateUsers" && (
        <UpdateUsers userId={selectedUserId} onClose={closeSubpage} />
      )}

      {/* Render Main Pages if No Subpage is Active */}
      {!activeSubpage && selectedPage === "Home" && <HomePage />}
      {!activeSubpage && selectedPage === "Roles" && (
        <Roles openSubpage={openSubpage} />
      )}
      {!activeSubpage && selectedPage === "Users" && (
        <Users openSubpage={openSubpage} />
      )}
    </div>
  );
};

export default Content;

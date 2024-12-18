import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Content from "../components/Content";
import Navbar from "../components/Navbar";

const Home = () => {
  const [selectedPage, setSelectedPage] = useState("Home");

  return (
    <div className="d-flex flex-column vh-100">
      
      {/* Navbar */}
      <div
        style={{ minWidth: "1440px", height: "104px", background: "#662671" }}
      >
        <Navbar />
      </div>

      {/* Main Section */}
      <div className="d-flex" style={{ height: "70%" }}>

        {/* Sidebar */}
        <div
          style={{
            width: "353px",
            height: "920px",
            top: "104px",
            background: "#F4F4F4",
          }}
        >
          <Sidebar setSelectedPage={setSelectedPage} />
        </div>

        {/* Content */}
        <div
          style={{
            minWidth: "1057px",
            height: "890px",
            top: "114px",
            left: "367px",
            borderRadius: "10px",
            background: "#FFFFFF",
            boxShadow: "0px 4px 4px 0px #00000040",
          }}
        >
          <Content selectedPage={selectedPage} />
        </div>
      </div>
    </div>
  );
};

export default Home;

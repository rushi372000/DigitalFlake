import React from "react";

const HomePage = ({ openSubpage }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        src="/HomePage.png"
        alt="Home Page"
        style={{
          position: "absolute",
          width: "276px",
          height: "146px",
          top: "370px",
          left: "750px",
        }}
      />
      <p
        style={{
          position: "absolute",
          width: "369px",
          height: "36px",
          top: "533px",
          left: "745px",
          fontFamily: "Poppins",
          fontSize: "24px",
          fontWeight: "400",
          lineHeight: "36px",
          textAlign: "left",
          textUnderlinePosition: "from-font",
          textDecorationSkipInk: "none",
        }}
      >
        Welcome to Digitalflake admin
      </p>
    </div>
  );
};

export default HomePage;

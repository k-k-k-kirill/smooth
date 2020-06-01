import React from "react";
import SideMenu from "../../SideMenu/SideMenu";

const LayoutHorizontal: React.FC = ({ children }) => {
  return <div className="layout-horizontal">
    <SideMenu />
    <div>
      { children }
    </div>
  </div>;
};

export default LayoutHorizontal;

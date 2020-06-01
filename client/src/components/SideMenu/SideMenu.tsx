import React from "react";

//Components
import Brand from "../Brand/Brand";
import MenuItem from "../MenuItem/MenuItem";
import { ReactComponent as UpcomingIcon } from "../../assets/images/view_agenda.svg";

const SideMenu: React.FC = () => {
  const menuItems = [
    {
      label: "Upcoming",
      route: "/upcoming",
      icon: <UpcomingIcon />,
    },
  ];

  const menuItemComponents = menuItems.map((item) => {
    return (
      <MenuItem
        key={item.label}
        route={item.route}
        label={item.label}
        icon={item.icon}
      />
    );
  });

  return (
    <div className="side-menu__container">
      <div className="side-menu__brand">
        <Brand />
      </div>
      <ul className="side-menu__list">{menuItemComponents}</ul>
    </div>
  );
};

export default SideMenu;

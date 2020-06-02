import React from "react";

//Components
import Brand from "../Brand/Brand";
import MenuItem from "../MenuItem/MenuItem";
import { ReactComponent as UpcomingIcon } from "../../assets/images/home.svg";
import { ReactComponent as ProjectsIcon } from "../../assets/images/work_outline.svg";
import { ReactComponent as TemplatesIcon } from "../../assets/images/web.svg";
import { ReactComponent as TimeTrackingIcon } from "../../assets/images/schedule.svg";

const SideMenu: React.FC = () => {
  const menuItems = [
    {
      label: "Upcoming",
      route: "/upcoming",
      icon: <UpcomingIcon />,
    },
    {
      label: "Projects",
      route: "/projects",
      icon: <ProjectsIcon />,
    },
    {
      label: "Templates",
      route: "/templates",
      icon: <TemplatesIcon />,
    },
    {
      label: "Time tracking",
      route: "/time",
      icon: <TimeTrackingIcon />,
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

import React from "react";
import { withRouter, RouteComponentProps, useLocation } from "react-router-dom";

interface Props extends RouteComponentProps {
  route: string;
  label: string;
  icon: any;
}

const MenuItem: React.FC<Props> = ({ history, route, label, icon }) => {
  const location = useLocation();
  const menuItemClicked = () => {
    history.push(route);
  };

  return (
    <li className={`side-menu__item ${location.pathname === route ? 'active' : ''}`} onClick={menuItemClicked}>
      <div className="side-menu__item__icon">{icon}</div>
      <div className="side-menu__item__label">{label}</div>
    </li>
  );
};

export default withRouter(MenuItem);

import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";

// Component imports
import Button from "../UI/Button/Button";
import NavHorizontal from "../UI/NavHorizontal/NavHorizontal";
import Brand from "../Brand/Brand"

interface Props extends RouteComponentProps {}

const Header: React.FC<Props> = ({ history }) => {
  const navItems = [
    {
      label: "About",
      route: "/about",
    },
    {
      label: "Contact Us",
      route: "/contact",
    },
    {
      label: "Log In",
      route: "/login",
    },
  ];

  return (
    <>
      <header className="app-header">
        <Brand />
        <div className="top-nav">
          <NavHorizontal items={navItems} />
          <Button
            classes="app-header__button"
            purple={true}
            label="Sign Up"
            clicked={() => history.push("/signup")}
          />
        </div>
      </header>
    </>
  );
};

export default withRouter(Header);

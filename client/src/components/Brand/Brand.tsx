import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/images/smooth_logo.svg";

interface Props extends RouteComponentProps {}

const Brand: React.FC<Props> = ({ history }) => {
  return (
    <div className="app-logo">
      <Logo
        onClick={() => {
          history.push("/");
        }}
      />
    </div>
  );
};

export default withRouter(Brand);

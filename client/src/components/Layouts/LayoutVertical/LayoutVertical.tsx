import React from "react";

//Components
import Header from "../../Header/Header";

const LayoutVertical: React.FC = ({ children }) => {
  return (
    <article>
      <Header />
      {children}
    </article>
  );
};

export default LayoutVertical;

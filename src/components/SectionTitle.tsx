import React from "react";

import Divider from "./Divider";

const SectionTitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <h2 className="text-3xl">{children}.</h2>
      <Divider />
    </>
  );
};

export default SectionTitle;

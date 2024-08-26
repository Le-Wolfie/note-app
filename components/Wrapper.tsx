import React from "react";
import Sidebar from "./Sidebar";

type Props = React.PropsWithChildren<{}>;

const Wrapper = ({ children }: Props) => {
  return (
    <div className='h-full w-full p-4 flex gap-4'>
      <Sidebar />
      <main className='h-full w-full flex gap-4'>{children}</main>
    </div>
  );
};

export default Wrapper;

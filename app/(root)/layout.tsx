import Navbar from "@/components/Navbar";
import Wrapper from "@/components/Wrapper";

type Props = React.PropsWithChildren<{}>;

const Layout = ({ children }: Props) => {
  return (
    <>
      <Navbar />
      <Wrapper>{children}</Wrapper>
    </>
  );
};

export default Layout;

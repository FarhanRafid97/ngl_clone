import Navbar from './Navbar';
import Wrapper, { VariantType } from './Wrapper';

interface LayoutProps {
  children: React.ReactNode;
  variant: VariantType;
}

const Layout: React.FC<LayoutProps> = ({ children, variant }) => {
  return (
    <>
      <Navbar />
      <Wrapper variant={variant}>{children}</Wrapper>
    </>
  );
};

export default Layout;

import Navbar from './Navbar';
import Wrapper, { VariantType } from './Wrapper';
import Head from 'next/head';
import { AiOutlineLogin } from 'react-icons/ai';

interface LayoutProps {
  children: React.ReactNode;
  variant: VariantType;
  headTitle: string;
}

const Layout: React.FC<LayoutProps> = ({ children, variant, headTitle }) => {
  return (
    <>
      <Navbar />
      <Wrapper variant={variant}>
        <Head>
          <title>{headTitle}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {children}
      </Wrapper>
    </>
  );
};

export default Layout;

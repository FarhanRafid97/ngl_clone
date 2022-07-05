import React, { Children } from 'react';
import { Box } from '@chakra-ui/react';

export type VariantType = 'home' | 'main';
interface WrapperProps {
  children: React.ReactNode;
  variant?: VariantType;
}

const Wrapper: React.FC<WrapperProps> = ({ children, variant }) => {
  return (
    <Box
      w={variant === 'home' ? '100%' : '800px'}
      minH="100vh"
      margin="auto"
      mx="auto"
      p="15px"
      paddingTop="55px"
    >
      {children}
    </Box>
  );
};

export default Wrapper;

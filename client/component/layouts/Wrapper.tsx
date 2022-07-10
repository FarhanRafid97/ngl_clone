import React, { Children } from 'react';
import { Box, Flex } from '@chakra-ui/react';

export type VariantType = 'home' | 'main';
interface WrapperProps {
  children: React.ReactNode;
  variant?: VariantType;
}

const Wrapper: React.FC<WrapperProps> = ({ children, variant }) => {
  return (
    <Flex w="100%" maxH="100vh" bg="#FAFAFA">
      <Box
        w={variant === 'home' ? '650px' : '800px'}
        minH="100vh"
        margin="auto"
        mx="auto"
        paddingTop="25px"
      >
        {children}
      </Box>
    </Flex>
  );
};

export default Wrapper;

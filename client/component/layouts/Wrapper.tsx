import React, { Children } from 'react';
import { Box, Flex } from '@chakra-ui/react';

export type VariantType = 'home' | 'main';
interface WrapperProps {
  children: React.ReactNode;
  variant?: VariantType;
}

const Wrapper: React.FC<WrapperProps> = ({ children, variant }) => {
  return (
    <Flex w="100%" minH="100vh" bg="gray.50">
      <Box
        w={variant === 'home' ? '100%' : '800px'}
        minH="100vh"
        margin="auto"
        mx="auto"
      >
        {children}
      </Box>
    </Flex>
  );
};

export default Wrapper;

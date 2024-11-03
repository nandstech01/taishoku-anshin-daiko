// src/components/ui/Input.tsx

import React from 'react';
import { Input as ChakraInput, FormControl, FormLabel, InputProps as ChakraInputProps } from '@chakra-ui/react';

interface InputProps extends ChakraInputProps {
  label?: string;
}

const Input: React.FC<InputProps> = ({ label, ...props }) => {
  return (
    <FormControl>
      {label && <FormLabel>{label}</FormLabel>}
      <ChakraInput {...props} />
    </FormControl>
  );
};

export default Input;

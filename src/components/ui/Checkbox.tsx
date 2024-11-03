// src/components/ui/Checkbox.tsx
import { Checkbox as ChakraCheckbox } from '@chakra-ui/react';
import React from 'react';

interface CheckboxProps {
  isChecked?: boolean;
  onChange?: () => void;
  children: React.ReactNode;
}

const Checkbox: React.FC<CheckboxProps> = ({ isChecked, onChange, children }) => {
  return <ChakraCheckbox isChecked={isChecked} onChange={onChange}>{children}</ChakraCheckbox>;
};

export default Checkbox;

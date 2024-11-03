// src/components/ui/Label.tsx
import { FormLabel } from '@chakra-ui/react';
import React from 'react';

interface LabelProps {
  htmlFor?: string;
  children: React.ReactNode;
}

const Label: React.FC<LabelProps> = ({ htmlFor, children }) => {
  return <FormLabel htmlFor={htmlFor}>{children}</FormLabel>;
};

export default Label;

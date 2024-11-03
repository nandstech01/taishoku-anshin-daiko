// src/components/ui/radio-group.tsx
import { Radio, RadioGroup as ChakraRadioGroup, Stack } from '@chakra-ui/react';
import React from 'react';

interface RadioGroupProps {
  value?: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
}

export const RadioGroup: React.FC<RadioGroupProps> = ({ value, onChange, options }) => {
  return (
    <ChakraRadioGroup onChange={onChange} value={value}>
      <Stack direction="row">
        {options.map((option) => (
          <Radio key={option.value} value={option.value}>
            {option.label}
          </Radio>
        ))}
      </Stack>
    </ChakraRadioGroup>
  );
};

import React, { useState } from 'react';
import { Box, Form, TextInput } from 'grommet';

function SearchInput({onSubmit}) {
  const [value, setValue] = useState('');

  const updateValue = ({target: { value }}) => {
    setValue(value);
  };

  return (
    <Box>
      <Box>
        <Form onSubmit={onSubmit.bind(null, value)}>
          <TextInput
            name="name"
            value={value}
            onChange={updateValue}
            placeholder="search github username eg: niikwartey"
            size="small"
            autoFocus
          />
        </Form>
      </Box>
    </Box>
  );
}

export default SearchInput;
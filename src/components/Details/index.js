import React from 'react';
import { Box, Image, Text } from 'grommet';
import './style.css'

export function UserDetails({login, avatar_url}) {
  return (
    <Box 
      className="UserDetails" 
      direction="row" 
      align="center" 
      gap="small"
    >
      <Box height="30px" width="30px">
        <Image 
          className="avatar"
          src={avatar_url} 
          alt={`${login}'s avatar`}
          fill
        />
      </Box>

      <Text weight="bold" color="#000">{login}</Text>
    </Box>
  );
}

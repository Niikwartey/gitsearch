import React from 'react';
import { Box, Image, Text } from 'grommet'

export function UserDetails({login, avatar_url}) {
  return (
    <Box direction="row" align="center" gap="small">
      <Box height="30px" width="30px" style={{borderRadius: "100%"}}>
        <Image 
          src={avatar_url} 
          alt={`${login}'s avatar`} 
          style={{borderRadius: "100%"}}
          fill
        />
      </Box>

      <Text weight="bold" color="#000">{login}</Text>
    </Box>
  );
}

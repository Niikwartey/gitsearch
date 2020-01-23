import React, { useState } from 'react';
import { Box, Text } from 'grommet';
import SearchForm from '../../components/SearchForm';
import GitHubUser from '../../components/ GitHubUser';
import { getGitHubUser }  from '../../helpers';
import { NO_USER_MESSAGE } from '../../constants';
import './style.css'

function Search() {
  const [username, setUsername] = useState('');
  const [gitHubUser, setGitHubUser] = useState(null);
  const [userNotFound, setUserNotFound] = useState(false);
  const [newSearch, setNewSearch] = useState(false);
  
  const submitSearch = (username) => {
    getGitHubUser({username})
      .then(response => {
        if(response && response.message !== NO_USER_MESSAGE) {
          setGitHubUser(response);
          setUsername(username);
          setNewSearch(true);
          setUserNotFound(false);
        }
        else {
          setUserNotFound(true);
          setGitHubUser(null);
        }
      })
      .catch(error => console.log(error));
  };

  return (
    <Box className="Search" gap="large">
      <SearchForm onSubmit={submitSearch} />
      {
        gitHubUser && 
        <GitHubUser 
          gitHubUser={gitHubUser} 
          isSearchedUser={username === gitHubUser.login} 
          newSearch={newSearch ? () => setNewSearch(false) : false}
        />
      }
      {
        userNotFound &&
        <Box className="userNotFound" animation="fadeIn" align="start">
          <Text size="small">
            User not found. Please check username and try again.
          </Text>
        </Box>
      }
    </Box>
  );
}

export default Search;
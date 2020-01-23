import React, { useState } from 'react';
import { Box } from 'grommet';
import SearchForm from '../../components/SearchForm';
import  GitHubUser from '../../components/ GitHubUser'
import { getGitHubUser }  from '../../helpers';
import './style.css'

function Search() {
  const [username, setUsername] = useState('');
  const [gitHubUser, setGitHubUser] = useState(null);

  const submitSearch = (username) => {
    getGitHubUser({username})
      .then(response => {
        setGitHubUser(response);
        setUsername(username)
      })
      .catch(error => console.log(error));
  };

  return (
    <Box className="Search" gap="large">
      <SearchForm onSubmit={submitSearch} />
      {
        gitHubUser && <GitHubUser gitHubUser={gitHubUser}/>
      }
    </Box>
  );
}

export default Search;
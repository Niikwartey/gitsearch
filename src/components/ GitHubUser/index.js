import React, { useState } from 'react';
import { Box, Collapsible, Button, Text } from 'grommet';
import { UserDetails } from '../Details';
import { getUserFollowers } from '../../helpers';
import { API_RESPONSE_CAP } from '../../constants';
import './style.css';

function GitHubUser({gitHubUser, isSearchedUser, newSearch}) {
  const [followers, setFollowers] = useState(null);
  const [index, setIndex] = useState(1);
  const [showFollowers, setShowFollowers] = useState(false);
  const [followersCount, setFollowersCount] = useState(gitHubUser.followers);
  const showingAllFollowers = (followers && followersCount) && followers.length === followersCount;

  const getFollowers = () => {
    getUserFollowers({username: gitHubUser.login})
      .then(userFollowers => {
        if (Array.isArray(userFollowers)) {
          setFollowers(userFollowers);
          setFollowersCount(gitHubUser.followers);
          
          if(userFollowers.length < API_RESPONSE_CAP) {
            setFollowersCount(userFollowers.length);
          }
        }
      })
  };

  const loadMoreFollowers = (event) => {
    event.stopPropagation();
    const nextIndex = index + 1;

    getUserFollowers({username: gitHubUser.login, index: nextIndex})
      .then(moreFollowers => {
        if (Array.isArray(moreFollowers) || moreFollowers.length > 0) {
          const allFollowers = [...followers, ...moreFollowers];
          
          setFollowers(allFollowers);
          setIndex(nextIndex);
    
          if (moreFollowers.length < API_RESPONSE_CAP) {
            setFollowersCount(allFollowers.length);
          }
        }
      })
  };

  const toggleShowFollowers = (event) => {
    event.stopPropagation();
    setShowFollowers(!showFollowers);

    if(!followers) {
      getFollowers();
    }
  };

  if(newSearch && isSearchedUser) {
    if(followers) setFollowers(null);

    getFollowers();
    newSearch();
  }

  return (
    <Box className="GitHubUser" animation="fadeIn"> 
      <Box onClick={toggleShowFollowers} focusIndicator={false}>
        <UserDetails {...gitHubUser} />
        
        {
          followersCount ?
          <Box align="start" margin={{top: "small"}}>
            <Text size="small">
              followers: {followersCount}
            </Text>
          </Box>
          :
          null
        }
      </Box>
    
      <Collapsible open={showFollowers}>
        <Box
          margin={{left: "medium", top: "small"}}
          animation={showFollowers ? "fadeIn" : {"type": "fadeOut","delay": 0, "duration": 0 }} 
        > 
          <Box className="detailsSection">
            {
              !followers &&
              <Box align="start">
                <Text size="small" >fetching followers...</Text> 
              </Box>
            }
            {
              (Array.isArray(followers) && followers.length === 0) &&
              <Box align="start">
                <Text size="small">no followers :(</Text> 
              </Box>
            }
            {
              (Array.isArray(followers) && followers.length > 0) &&
                <Box>
                  <Box align="start" pad={{bottom: "small"}}>
                    <Text size="small">
                      {gitHubUser.login}'s followers
                      <Text className="infoText sub" size="xsmall">
                        (showing {followers.length}{followersCount && `/${followersCount}`})
                      </Text>
                    </Text>
                    
                  </Box>
                  {
                    followers.map((follower, index) => (
                      <GitHubUser gitHubUser={follower} key={index}/>
                    ))
                  }
                  {
                    !showingAllFollowers &&
                    <Button 
                      label="show more" 
                      onClick={loadMoreFollowers} 
                      focusIndicator={false} 
                      plain 
                    />
                  }
                </Box>
            }
          </Box>
        </Box>
      </Collapsible>
    </Box>
  );
}

export default GitHubUser;
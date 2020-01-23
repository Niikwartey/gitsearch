import React, { useState } from 'react';
import { Box, Collapsible, Button, Text } from 'grommet';
import { UserDetails } from '../Details';
import { getUserFollowers } from '../../helpers';

function GitHubUser({gitHubUser}) {
  const [followers, setFollowers] = useState(null);
  const [index, setIndex] = useState(1);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showingAllFollowers, setShowingAllFollowers] = useState(false);
  const [followersCount, setFollowersCount] = useState(gitHubUser.followers);

  const getFollowers = () => {
    getUserFollowers({username: gitHubUser.login})
      .then(followers => {
        setFollowers(followers);
  
        if ((followers && followers.length < 30) || (followers.length === followersCount)) {
          setShowingAllFollowers(true);
          setFollowersCount(followers.length);
        }
      })
  };

  const toggleShowFollowers = (event) => {
    event.stopPropagation();
    setShowFollowers(!showFollowers);

    if(!followers) {
      getFollowers()
    }
  };

  const loadMoreFollowers = (event) => {
    event.stopPropagation();

    const nextIndex = index + 1;

    getUserFollowers({ username: gitHubUser.login, index: nextIndex})
      .then(moreFollowers => {
        if (Array.isArray(moreFollowers)) {
          if (moreFollowers.length === 0) {
            setShowingAllFollowers(true);
          } 
          else {
            const allFollowers = [...followers, ...moreFollowers]
            setFollowers(allFollowers);
            setIndex(nextIndex);
  
            if ((allFollowers.length < 30) || (allFollowers.length === followersCount)) {
              setShowingAllFollowers(true);
              setFollowersCount(allFollowers.length);
            }
          }
        }
      })
  };

  return (
    <Box 
      onClick={toggleShowFollowers} 
      animation="fadeIn" 
      focusIndicator={false} 
      margin={{bottom: "small"}}
    > 
      <Box>
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
          <Box style={{borderLeft: "1px solid #ccc", paddingLeft: "20px", margin: "10px"}}>
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
                      <Text size="xsmall" color="#777" style={{fontStyle: "italic", marginLeft: "5px"}}>
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
                    <Button label="show more" onClick={loadMoreFollowers} focusIndicator={false} plain />
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
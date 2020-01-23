import { GITHUB_USER_API, API_HEADER } from './constants'

export function fetchFromGitHub(endpoint) {
  return fetch(endpoint, API_HEADER)
    .then(response => response.json())
    .catch(error => console.log(error))
}

export function getGitHubUser({username}) { 
  const userEndpoint = `${GITHUB_USER_API}/${username}`;
  return fetchFromGitHub(userEndpoint);
} 

export function getUserFollowers({username, index=1}) {
  const detailEnpoint = `${GITHUB_USER_API}/${username}/followers?page=${index}`;
  return fetchFromGitHub(detailEnpoint);
}


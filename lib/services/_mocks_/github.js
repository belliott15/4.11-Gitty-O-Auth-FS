const exchangeCodeForToken = async (code) => {
  return `MOCK_TOKEN_FOR_CODE_${code}`;
};

const getGitHubProfile = async (token) => {
    console.log(`Mock invoked, getGitHubProfile(${token})`);
  return {
    login: 'Billy Bucherson', 
    avatar_url: 'https://www.placecage.com/gif/200/200',
    email: 'billy@bucherson.gov'
  };
};

module.exports = { exchangeCodeForToken, getGitHubProfile };

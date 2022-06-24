const { Router } = require('express');
const jwt = require('jsonwebtoken');
const GithubUser = require('../models/GithubUser');
const { exchangeCodeForToken, getGitHubProfile } = require('../services/github');

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

module.exports = Router()
  .get('/login', async (req, res) => {
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=user&redirect_uri=${process.env.REDIRECT_URI}`
    );
  })
  .get('/callback', async (req, res, next) => {
    try{
      const { code } = req.query;

      const token = await exchangeCodeForToken(code);

      const gitHubProfile = await getGitHubProfile(token);

      let user = await GithubUser.findByUserName(gitHubProfile.login);

      if(!user){
        user = await GithubUser.insert({
          username: gitHubProfile.login, 
          email: gitHubProfile.email,
          avatar_url: gitHubProfile.avatar_url
        });
      }
      const payload = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
        expiresIn: '1 day',
      });

      res.cookie(process.env.COOKIE_NAME, payload, {
        httpOnly: true, 
        maxAge: ONE_DAY_IN_MS,
      })
        .redirect('/api/v1/github/dashboard');
      
    }catch(e){
      next(e);
    }
  })
;

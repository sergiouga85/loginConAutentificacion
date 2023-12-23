import {Router} from 'express'
import passport from 'passport'

export const gitHubRouter = Router()

//github

gitHubRouter.get('/githublogin',
  passport.authenticate('github', { scope: ['user:email'] })
)

gitHubRouter.get('/githubcallback',
  passport.authenticate('github', {
    successRedirect: '/productos',
    failureRedirect: '/login',
  })
)
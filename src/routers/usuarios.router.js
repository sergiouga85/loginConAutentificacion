import { Router } from 'express'
import passport from 'passport'
import { dbUsuarios } from '../models/User.js'
import { soloAdmins, soloLogueadosApi } from '../middlewares/auth.js'

export const usuariosRouter = Router()

usuariosRouter.post('/register',
  passport.authenticate('register', {
    failWithError: true
  }),
  function (req, res) {
    res.status(201).json({ status: 'success', payload: req.user })
  },
  function (error, req, res, next) {
    res
      .status(400)
      .json({
        status: 'error',
        message: error.message
      })
  }
)

usuariosRouter.post('/resetpassword', async function (req, res) {
  try {
    const actualizado = await dbUsuarios.resetearContrasenia(req.body.email, req.body.password)
    res.json({ status: 'success', payload: actualizado })
  } catch (error) {
    res.status(404).json({ status: 'error', message: error.message })
  }
})

usuariosRouter.get('/current', soloLogueadosApi, async (req, res) => {
  res.json({ status: 'success', payload: req.user })
})

usuariosRouter.get('/', soloAdmins, async (req, res) => {
  const usuarios = await usuariosManager.find().lean()
  res.json({ status: 'success', payload: usuarios })
})
const router = require('express').Router()
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Admin = require('../models/Admin')
const User = require('../models/User')
const auth = require('../middleware/auth');

// Global Variables
const _id = new mongoose.Types.ObjectId();

// @route admin/
// @desc Gets All Admins
router.get('/', (req, res, next) => {
  Admin.find()
    .exec()
    .then(admin => res.status(200).json({ admin }))
    .catch(err => res.status(500).json({ error: err }))
})

// @route remove/user/:id
// @desc Removes A Single User
router.post('/remove/user/:id', auth, (req, res) => {
  User.findByIdAndRemove(req.params.id)
    .exec()
    .then(user => res.status(201).json({ user }))
    .catch(err => res.status(500).json({ error: err }))
})

// @route /signup
// @desc Admin Register
router.post('/signup', (req, res, next) => {
  Admin.find({ email: req.body.email })
    .exec()
    .then(user => {
      const adminSignup =
        user.length > 0
          ? res.status(500).json({ message: 'User already exists' })
          : bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) res.status(500).json({ error: err })
            else {
              const { name, email } = req.body

              const admin = new Admin({
                _id,
                name,
                email,
                password: hash,
                createdAt: new Date().toISOString()
              })

              admin
                .save()
                .then(doc => res.status(201).json({ message: 'Admin Registered Successfully' }))
                .catch(err => res.status(500).json({ error: err }))
            }
          })
      return adminSignup
    })
})

router.post('/login', (req, res, next) => {
  Admin.find({ email: req.body.email })
    .exec()
    .then(user => {
      const session =
        user.length <= 0
          ? res.status(500).json({ message: 'Something broke!' })
          : bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if (err) res.status(500).json({ message: 'Login failed' })
            else {
              if (result) {
                // Create token
                const payload = {
                  userId: user[0]._id,
                  iat: Math.floor(Date.now() / 1000) - 30,
                  exp: Math.floor(Date.now() / 1000) + 60 * 60
                }
                jwt.sign(payload, 'mysecretkey', (err, token) => {
                  if (err) res.status(200).json({ error: 'err' })
                  else {
                    res.status(200).json({
                      login: `Hello ${user[0].name}`,
                      message: 'Login Successfully',
                      token
                    })
                  }
                })
              } else res.status(200).json({ message: 'Login Failed' })
            }
          })
      return session
    })
    .catch(err => res.status(500).json({ error: err }))
})

module.exports = router

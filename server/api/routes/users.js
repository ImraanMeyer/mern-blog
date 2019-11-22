const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const User = require('../models/User');

// Global Variables
const _id = new mongoose.Types.ObjectId();

router.get('/', (req, res) => {
  User.find()
    .exec()
    .then(users => res.json({ users }))
    .catch(err => console.log(err))
})

router.post('/signup', (req, res, next) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then(user => {
      const newUser = user
        ? res.status(500).json({ message: 'User already exists' })
        : bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) res.status(500).json({ error: 'Something broke' })
          else {
            const { name, email } = req.body
            const user = new User({
              _id,
              name,
              email,
              password: hash,
              createdAt: new Date().toISOString()
            })

            user
              .save()
              .then(doc => res.status(201).json({ message: 'Account Created Successfully' }))
              .catch(err => res.status(500).json({ error: err }))
          }
        })
      return newUser
    })
})

router.post('/login', (req, res, next) => {
  User.findOne({ email: req.body.email })
    .select('_id name email password')
    .exec()
    .then(user => {
      const session = user
        ? bcrypt.compare(req.body.password, user.password, (err, result) => {
          if (err) res.status(500).json({ message: 'Login Failed' })
          else {
            if (result) {
              const payload = {
                userId: user._id,
                iat: Math.floor(Date.now() / 1000) - 30,
                exp: Math.floor(Date.now() / 1000) + 60 * 60 * 60 * 24
              }
              jwt.sign(payload, 'mysecretkey', (err, token) => {
                if (err) res.status(500).JSON({ message: 'Authentication Failed' })
                else {
                  res.status(200).json({
                    message: {
                      user: {
                        userId: user._id,
                        name: user.name,
                        email: user.email
                      },
                      token: token
                    }
                  })
                }
              })
            }
          }
        })
        : res.status(500).json({ message: 'Email does not exist' })
      return session
    })
    .catch(error => res.status(500).json({ error: error }))
})

module.exports = router

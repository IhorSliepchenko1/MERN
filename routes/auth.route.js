const { Router } = require('express')
const router = Router()
const User = require('./../models/User')
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.post('/registration',
     [
          check('email', 'Введите корректный email').isEmail(),
          check('password', 'Пароль должен быть не менее 6 символов').isLength({ min: 6 })
     ]
     ,
     async (req, res) => {
          try {
               const errors = validationResult(req)
               if (!errors.isEmpty()) {
                    return res.status(400).json(
                         {
                              errors: errors.array(),
                              message: 'Некорректные данные при регистрации'
                         })
               }

               const { email, password } = req.body

               const isUsed = await User.findOne({ email })

               if (isUsed) {
                    return res.status(300).json(req.body.email)
               }

               const hashedPassword = await bcrypt.hash(password, 12)

               const user = new User({ email, password: hashedPassword })
               await user.save()

               res.status(201).json({ message: 'Пользователь создан', email, password })

          } catch (err) {
               console.error('Error during registration:', err)
               res.status(500).json({ message: 'Server error' })
          }
     })


router.post('/login',
     [
          check('email', 'Введите корректный email').isEmail(),
          check('password', 'Пароль должен быть не менее 6 символов').exists()
     ]
     ,
     async (req, res) => {
          try {
               const errors = validationResult(req)
               if (!errors.isEmpty()) {
                    return res.status(400).json(
                         {
                              errors: errors.array(),
                              message: 'Некорректные данные при регистрации'
                         })
               }

               const { email, password } = req.body

               const user = await User.findOne({ email })
               if (!user) {
                    return res.status(400).json({ message: 'Пользователь не найден' })
               }
               const isMatch = await bcrypt.compare(password, user.password)

               if (!isMatch) {
                    return res.status(400).json({ message: 'Неверный пароль' })
               }

               const token = jwt.sign(
                    { userId: user.id },
                    process.env.SECRET_KEY,
                    { expiresIn: '1h' }
               )

               res.status(200).json({ token, userId: user.id })


          } catch (err) {
               console.error('Error during registration:', err)
               res.status(500).json({ message: 'Server error' })
          }
     })

module.exports = router
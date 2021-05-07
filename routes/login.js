const express = require('express');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/users')
const loginRoute = express.Router();
const config = require('../config');
const bcrypt = require('bcrypt')

loginRoute.post("/", async (req, res) => {

  try {
    const useree = await UserModel.findOne({ email: req.body.email })

    if (!useree) {
      res.status(403).json({
      })
    }
    else {

      const same = await bcrypt.compare(req.body.password, useree.password)

      if (!same) {

        res.status(404).json({})
      }
      else {
        const token = await jwt.sign({ user: useree }, config.secret, { expiresIn: '1d' })

        const refreshToken = await jwt.sign({ user: useree }, config.secret, { expiresIn: '365d' })
        res.status(200).send({ auth: true, userId: useree._id, token, refreshToken });
        // res.status(200).send({ auth: true, userId: useree._id, token });
      }
    }
  }
  catch (err) {

  }
})

module.exports = loginRoute;
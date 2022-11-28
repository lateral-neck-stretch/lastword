const router = require('express').Router()
const { models: { User, Prompt }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const prompts = await Prompt.findAll({
      attributes: ['id', 'title', 'topic', 'difficulty']
    })
    res.json(prompts)
  } catch (err) {
    next(err)
  }
})

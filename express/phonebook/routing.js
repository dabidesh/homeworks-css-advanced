const phonebookController = require('./controllers/phonebook-controller')
const router = require('express').Router()


router.get('/', phonebookController.index)
router.post('/add', phonebookController.addPhonebookPost)

router.post('/del', phonebookController.delPhonebookPost)

router.get('/error', (req, res) => {
  res.status(404).sendFile('static/404.html', { root: __dirname })
})


module.exports = router;

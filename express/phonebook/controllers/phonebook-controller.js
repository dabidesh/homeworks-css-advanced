const phonebook = require('../phonebook')
const Contact = require('../models/Contact')

module.exports = {
  index: (req, res) => {

    let contacts = phonebook.getContacts()

    //let tmpProba = 'Валидни данни!'

    res.render('index', { contacts })
    // TODO: load index page
  },
  addPhonebookPost: (req, res) => {
    // TODO: add a phonebook object to the array
    //console.log(req.body)

    let contact = new Contact(req.body.name, req.body.number)

    if (contact.name.length >= 2 && contact.name.length <= 33
      && contact.number.length >= 3 && contact.number.length <= 20) {
      phonebook.addContact(contact)

      let tmpProba = 'Валидни данни!'

      res.redirect('/')
      //res.render('index', { contact, tmpProba })
    } else {
      //res.send('<meta http-equiv="refresh" content = "1; url = /" /> <script>alert(\'Невалидно име или номер!\')</script><a href="/">Върни се или чакай 1 секунда!</a>')
      let tmpProba = 'Невалиднo име и/или номер!'
      //res.redirect('/')
      let contacts = phonebook.getContacts()
      res.render('index', { contacts, tmpProba })
    }
    //res.send('Тест')
  },

  delPhonebookPost: (req, res) => {
    let tmpDel = phonebook.delContact()
    let contacts = phonebook.getContacts()

    let tmpStr = 'Изтрит запис: '
    if (tmpDel === undefined) tmpStr = 'Няма записи за изтриване!'

    res.render('index', { contacts, tmpStr, tmpDel })

    //res.redirect('/')
  }
}
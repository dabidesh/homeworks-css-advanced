/* TODO: 
	create phonebook array
	add methods for adding in the phonebook and getting it
	export the methods
*/

const phonebook = []

const addContact = (contact) => {

  phonebook.push(contact)

  console.log(phonebook)
  /* } else
    res.send('<meta http-equiv="refresh" content = "1; url = /" /> <script>alert(\'Невалидно име или номер!\')</script><a href="/">Върни се или чакай 1 секунда!</a>') */


}

const getContacts = () => {
  return phonebook.slice()
}

const delContact = () => {
  let tmp = phonebook.shift()
}

module.exports = {
  addContact,
  getContacts,
  delContact,
}
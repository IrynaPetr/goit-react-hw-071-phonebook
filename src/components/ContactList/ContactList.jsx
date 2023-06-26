import Contact from 'components/Contact/Contact';
import { List } from './ContactList.styled';
import { useSelector } from 'react-redux';
import { getContacts, getFilter } from 'redux/selectors';

const getFilteredContacts = (contacts, filter) => {
  const normalizedFilter = filter.toLowerCase();
  return contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter));
};

function ContactList () {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const filteredContacts = getFilteredContacts(contacts, filter)

  return (
    <List>
      {filteredContacts.map(({ id, name, number}) =>  (        
        <Contact 
        key={id} 
        contact={{ name, id, number}}/>
        )
      )}
    </List>
  );
}

export default ContactList;
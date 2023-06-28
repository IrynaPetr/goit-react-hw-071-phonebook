import Contact from 'components/Contact/Contact';
import { List } from './ContactList.styled';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { selectFilteredContacts, selectError, selectIsLoading } from 'redux/selectors';
import { Loader } from '../Loader/Loader';
import { fetchContacts } from 'redux/operations';


function ContactList () {
  const filteredContacts = useSelector(selectFilteredContacts);
  const error = useSelector(selectError);
  const isLoading = useSelector(selectIsLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <List>
      {isLoading && !error? (
        <Loader/>
      ): filteredContacts.length === 0 && !error ? (
        <p>The Phonebook is empty. Add your first contact.</p>
      ) : (filteredContacts.map(({ id, name, number}) =>  (        
        <Contact 
        key={id} 
        contact={{ name, id, number}}/>
        )
      ))
      }
    </List>
  );
}

export default ContactList;
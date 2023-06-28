import PropTypes from 'prop-types';
import { ItemContainer, Button, Item } from './Contact.styled';
import { useDispatch } from 'react-redux';
import { deleteContact } from 'redux/operations';

export const Contact = ({ contact }) => {
  const dispatch = useDispatch();
  
  const handleDelete = () => {
    dispatch(deleteContact(contact.id));
  };

  return (
    <Item>
      <ItemContainer>
        <div>
          <span>{contact.name}: </span>
          <span>{contact.number}</span>
        </div>
        <Button type="button" onClick={handleDelete}>Delete</Button>
      </ItemContainer>
    </Item>
  );
}

Contact.propTypes = {
  contact: PropTypes.object.isRequired,
};

export default Contact;

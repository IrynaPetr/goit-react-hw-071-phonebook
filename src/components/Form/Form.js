import React, { useState } from 'react';
import { FormEl, Label, Input, Button } from "./Form.styled";
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/operations';
import Notiflix from 'notiflix';
import { selectContacts } from 'redux/selectors';


function Form() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');


  const handleNameChange = e => {
    setName(e.target.value);
  };

  const handleNumberChange = e => {
    setNumber(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault();
const contact = {
  name: name,
  number: number,
};

    const isContactExist = contacts.find(
      ({ name }) => name.toLowerCase() === contact.name.toLowerCase()
    ); 
    if (isContactExist) {
      Notiflix.Report.warning(
        'Alert',
        `Contact with name ${contact.name} already exists!`,
        'Ok'
      );
      return;
    };
    const isNumberExist = contacts.find(
      ({ number }) => number.replace(/\D/g, '') === contact.number.replace(/\D/g, '')
    );
    if (isNumberExist) {
      Notiflix.Report.warning(
        'Alert',
        `Number with name ${contact.number} already exists!`,
        'Ok'
      );
      return;
    }

    dispatch(addContact(contact));
    setName('');
    setNumber('');
  }; 

  return (
    <FormEl onSubmit={handleSubmit} autoComplete='off'>
      <Label>
        Name
        <Input
          type="text"
          name="name"
          pattern="^[A-Za-z\u0080-\uFFFF ']+$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={handleNameChange}
        />
      </Label>
      <Label>
        Number
        <Input
          type="tel"
          name="number"
          pattern="^(\+?[0-9.\(\)\-\s]*)$"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={handleNumberChange}
        />
      </Label>
      <Button type="submit">Add contact</Button>
    </FormEl>
  );
};

export default Form;

import React, { Component } from "react";
import Form from '../components/Form/Form';
import ContactList from "./ContactList/ContactList";
import Filter from "./Filter/Filter";
import { nanoid } from 'nanoid';
import { Container, Title } from "./App.styled";
export class App extends Component {
  state = {
    contacts: [
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
    filter: '',
  };

componentDidMount() {
 const contacts = localStorage.getItem('contacts');
 const parsedContacts = JSON.parse(contacts);
 

 if(parsedContacts) {
  this.setState({contacts:parsedContacts});
 }
}

componentDidUpdate(prevProps, prevState) {
  if(this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  }
}

  formSubmitHandler = ({ name, number }) => {
const { contacts } = this.state;
  
  const newContact = {
    name, 
    number,
   id: nanoid(),
  };

  contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase()) ?
  alert(`${name} is already in contacts`) :
  this.setState(({ contacts }) => ({
    contacts: [newContact, ...contacts],
  }));
};

deleteContact = contactId => {
  this.setState(prevState => {
    const updateContacts = prevState.contacts.filter(contact => contact.id !== contactId);
    localStorage.setItem('contacts', JSON.stringify(updateContacts));
   return { contacts: updateContacts };
  });
};

changeFilter = e => {
this.setState({ filter: e.currentTarget.value });
};

FilterList = () => {
  const { filter, contacts } = this.state;
  const normalizeValue = filter.toLowerCase().trim();
  return contacts.filter( contact =>
     contact.name.toLowerCase().includes(normalizeValue));
};

  render() {
    const { filter } = this.state
    return (
  <Container>
    <Title>Phonebook</Title>
    <Form onSubmit={this.formSubmitHandler}/> 

    <Title>Contacts</Title>
    <Filter value={filter} changeFilter={this.changeFilter}/> 
    <ContactList contacts={this.FilterList()} 
    deleteContact={this.deleteContact}/>
  </Container>
  );}
  
};

export default App;
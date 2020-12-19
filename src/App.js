import React, { Component } from 'react';
import shortid from 'shortid';
import Container from './components/Container';
import Section from './components/Section';
import MyForm from './components/Form';
import Filter from './components/Filter';
import ContactList from './components/ContactList';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Elon Mask', number: '10664888778' },
      { id: 'id-2', name: 'Lena Kharchenko', number: '380664969795' },
      { id: 'id-3', name: 'Bill Gates', number: '10662475771' },
      { id: 'id-4', name: 'Mark Zuckerberg ', number: '10625884318' },
    ],
    filter: '',
  };

  componentDidMount() {
    console.log('componentDidMount');

    const parsedContacts = JSON.parse(localStorage.getItem('contacts'));

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate');
    if (this.state.contacts !== prevState.contacts) {
      console.log('Обновились контакты');
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = (name, number) => {
    const contact = {
      id: shortid.generate(),
      name,
      number,
    };

    this.setState(({ contacts }) => ({
      contacts: [contact, ...contacts],
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const { filter, contacts } = this.state;
    const visibleContacts = this.getVisibleContacts();
    return (
      <Container>
        <Section title="Cosmic Phonebook">
          <MyForm onSubmit={this.addContact} contacts={contacts} />
        </Section>
        <Section title="Contacts">
          <Filter value={filter} onChange={this.changeFilter} />
          <ContactList
            contacts={visibleContacts}
            onDeleteContact={this.deleteContact}
          />
        </Section>
      </Container>
    );
  }
}

export default App;

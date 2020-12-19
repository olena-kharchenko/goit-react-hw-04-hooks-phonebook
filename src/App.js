import { useState, useEffect, useRef } from 'react';
import shortid from 'shortid';
import Container from './components/Container';
import Section from './components/Section';
import MyForm from './components/Form';
import Filter from './components/Filter';
import ContactList from './components/ContactList';

const initialContacts = [
  { id: 'id-1', name: 'Elon Mask', number: '10664888778' },
  { id: 'id-2', name: 'Lena Kharchenko', number: '380664969795' },
  { id: 'id-3', name: 'Bill Gates', number: '10662475771' },
  { id: 'id-4', name: 'Mark Zuckerberg ', number: '10625884318' },
];

function App() {
  const [contacts, setContacts] = useState(initialContacts);
  const [filter, setFilter] = useState('');
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      const parsedContacts = JSON.parse(localStorage.getItem('contacts'));

      if (parsedContacts) {
        setContacts(parsedContacts);
      }

      isFirstRender.current = false;
      return;
    }
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (name, number) => {
    const contactWithId = {
      id: shortid.generate(),
      name,
      number,
    };

    setContacts([contactWithId, ...contacts]);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  const visibleContacts = getVisibleContacts();

  return (
    <Container>
      <Section title="Cosmic Phonebook">
        <MyForm onSubmit={addContact} contacts={contacts} />
      </Section>
      <Section title="Contacts">
        <Filter
          value={filter}
          onChange={e => setFilter(e.currentTarget.value)}
        />
        <ContactList
          contacts={visibleContacts}
          onDeleteContact={deleteContact}
        />
      </Section>
    </Container>
  );
}

export default App;

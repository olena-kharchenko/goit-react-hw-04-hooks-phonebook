import { useState } from 'react';

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

import PropTypes from 'prop-types';
import s from './Form.module.css';

function MyForm({ contacts, onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const contactMatching = () => {
    const namesInPhonebook = contacts.reduce(
      (acc, contact) => [...acc, contact.name],
      [],
    );

    const numbersInPhonebook = contacts.reduce(
      (acc, contact) => [...acc, contact.number],
      [],
    );

    if (
      namesInPhonebook.includes(name) ||
      numbersInPhonebook.includes(number)
    ) {
      alert(`${name}${number} is already in contacts`);
      return true;
    }

    if (name === '' || number === '') {
      alert('Please enter all data');
      return true;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    setName('');
    setNumber('');

    if (contactMatching()) {
      return;
    }

    onSubmit(name, number);
  };

  return (
    <form onSubmit={handleSubmit} className={s.form}>
      <label>
        Name
        <input
          type="text"
          name="name"
          value={name}
          placeholder="Elon Mask"
          onChange={e => setName(e.currentTarget.value)}
          className={s.input}
        />
      </label>
      <label>
        Number
        <PhoneInput
          country={'us'}
          value={number}
          placeholder="10664888778"
          onChange={setNumber}
        />
      </label>
      <div className={s.buttonWrapper}>
        <button type="submit" className={s.button}>
          Add contact
        </button>
      </div>
    </form>
  );
}

MyForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ),
};

export default MyForm;

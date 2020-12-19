import { Component } from 'react';

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

import PropTypes from 'prop-types';
import s from './Form.module.css';

class MyForm extends Component {
  state = {
    name: '',
    number: '',
  };

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
      }),
    ),
  };

  contactMatching = () => {
    const { name, number } = this.state;
    const { contacts } = this.props;
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

  handleChange = e => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
  };

  handleSubmit = e => {
    const { name, number } = this.state;

    e.preventDefault();
    this.setState({ name: '', number: '' });
    if (this.contactMatching()) {
      return;
    }

    this.props.onSubmit(name, number);
  };

  render() {
    const { name, number } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className={s.form}>
        <label>
          Name
          <input
            type="text"
            name="name"
            value={name}
            placeholder="Elon Mask"
            onChange={this.handleChange}
            className={s.input}
          />
        </label>
        <label>
          Number
          <PhoneInput
            country={'us'}
            value={number}
            placeholder="10664888778"
            onChange={number => this.setState({ number })}
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
}

export default MyForm;

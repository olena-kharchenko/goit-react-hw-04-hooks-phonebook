import PropTypes from 'prop-types';
import s from './Filter.module.css';

function Filter({ value, onChange }) {
  return (
    <label className={s.filter}>
      Find contacts by name
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Enter name to search"
        className={s.input}
      />
    </label>
  );
}

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Filter;

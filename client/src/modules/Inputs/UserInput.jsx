import PropTypes from "prop-types";

function UserInput({ type, id, name, placeholder }) {
  return (
    <input type={type} id={id} name={name} placeholder={placeholder} required />
  );
}

UserInput.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default UserInput;

function BookInput({ type, id, name, placeholder, value, onChange, required }) {
  return (
    <input
      type={type}
      id={id}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
    />
  );
}

export default BookInput;

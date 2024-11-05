function InputField({ label, type, name, value, onChange }) {
  return (
    <label>
      <p>{label}:</p>
      <input
        type={type}
        className="border-2 rounded border-neutral-200 p-1 text-sm"
        placeholder={`Enter your ${label}`}
        name={name}
        value={value}
        onChange={onChange}
      />
    </label>
  );
}

export default InputField;

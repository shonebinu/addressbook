function InputField({ label, type }) {
  return (
    <label>
      <p>{label}:</p>
      <input
        type={type}
        className="border-2 rounded border-neutral-200 p-1"
        placeholder={`Enter your ${label}`}
      />
    </label>
  );
}

export default InputField;

export default function Select({
  label,
  id,
  name,
  value,
  onChange,
  options,
  defaultOption,
  error,
}) {
  return (
    <div className="input-container">
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        name={name}
        className="select-category"
        value={value}
        onChange={onChange}
      >
        {defaultOption && (
          <option value="" disabled hidden>
            {" "}
            {defaultOption}
          </option>
        )}
        {options.map((opt) => {
          return (
            <option key={opt} value={opt}>
              {opt}
            </option>
          );
        })}
      </select>
      <p className="error">{error}</p>
    </div>
  );
}

export default function InputLabel({
  name = "username",
  label,
  type = "text",
  defaultValue,
  value,
  onChange,
  placeholder,
}) {
  label = label || name;
  return (
    <>
      {!placeholder && (
        <label htmlFor={name} className="block text-sm/6 font-medium">
          {label}
        </label>
      )}
      <div className="flex items-center">
        <input
          id={name}
          type={type}
          name={name}
          {...(value == undefined ? { defaultValue } : { value })}
          onChange={onChange}
          className="rounded grow border border-gray-500 bg-orange-100 p-1 text-base text-gray-900 sm:text-sm/6"
          placeholder={placeholder}
        />
      </div>
    </>
  );
}

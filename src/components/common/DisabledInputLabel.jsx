export default function DisabledInputLabel({
  id = "username",
  type = "text",
  defaultValue = "",
}) {
  return (
    <>
      <label htmlFor={id} className="block text-sm/6 font-medium">
        {id}
      </label>
      <div className="flex items-center">
        <input
          disabled
          id={id}
          type={type}
          name={id}
          defaultValue={defaultValue}
          className="rounded grow border border-gray-500 bg-orange-100 p-1 text-base text-gray-900 sm:text-sm/6"
        />
      </div>
    </>
  );
}

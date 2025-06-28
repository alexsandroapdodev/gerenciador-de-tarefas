import PropTypes from "prop-types";

function Input({
  type = "text",
  placeholder = "",
  value,
  onChange,
  className = "",
  ...rest
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`border border-slate-300 outline-slate-400 px-4 py-2 rounded-md ${className}`}
      value={value}
      onChange={onChange}
      {...rest}
    />
  );
}

Input.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default Input;

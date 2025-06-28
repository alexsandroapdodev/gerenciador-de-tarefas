import PropTypes from "prop-types";

function Button({ children, className = "", ...rest }) {
  return (
    <button
      {...rest}
      className={`bg-slate-400 p-2 rounded-md text-white ${className}`}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Button;

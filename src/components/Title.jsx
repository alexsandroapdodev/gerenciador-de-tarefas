function Title({ children, className = "" }) {
  return (
    <h1
      className={`text-3xl text-slate-100 font-bold text-center ${className}`}
    >
      {children}
    </h1>
  );
}

export default Title;

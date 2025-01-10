const Button = ({ label, style }) => {
  return (
    <button type="submit" className={style}>
      {label}
    </button>
  );
};

export default Button;

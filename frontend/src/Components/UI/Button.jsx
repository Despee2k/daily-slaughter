const Button = ({ label, style }) => {
  return (
    <div>
      <button className={style}>{label}</button>
    </div>
  )
}

export default Button

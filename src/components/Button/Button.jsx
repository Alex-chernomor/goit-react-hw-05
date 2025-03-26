export default function AddBtn({onClick, context, className, type}) {
 
  return (
    <button onClick={onClick} className={className} type={type} >{context}</button>
  )
}

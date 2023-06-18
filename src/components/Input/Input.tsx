import styles from './input.module.scss'

interface IProps {
    type?: string,
    onChange: (value: any) => any
    required?: boolean
    value: string,
    name: string,
    placeholder: string
}

const Input = ({type, onChange, required, value, name, placeholder}: IProps) => {
  return (
    <input
        className={styles.input}
        type={type ?? 'text'}
        onChange={onChange}
        required={required}
        value={value}
        name={name}
        placeholder={placeholder}
    />
  )
}
export default Input
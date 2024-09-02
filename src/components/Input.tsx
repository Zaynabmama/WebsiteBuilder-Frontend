
import styles from '../styles/Input.module.css'; 

interface InputProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({ type, placeholder, value, onChange, required = true }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={styles.input} // Applying the CSS module
      required={required}
    />
  );
};

export default Input;

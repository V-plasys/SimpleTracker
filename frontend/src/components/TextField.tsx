import type { InputHTMLAttributes } from 'react'
import styles from './TextField.module.css'

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export function TextField({ label, error, ...inputProps }: TextFieldProps) {
  return (
    <label className={styles.field}>
      <span className={styles.label}>{label}</span>
      <input className={error ? `${styles.input} ${styles.invalid}` : styles.input} {...inputProps} />
      {error && <span className={styles.error}>{error}</span>}
    </label>
  )
}

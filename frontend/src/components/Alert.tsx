import { Button } from './Button'
import styles from './Alert.module.css'

interface AlertProps {
  message: string
  onRetry?: () => void
  onDismiss?: () => void
}

export function Alert({ message, onRetry, onDismiss }: AlertProps) {
  return (
    <div className={styles.alert}>
      <span className={styles.message}>{message}</span>
      {onRetry && (
        <Button variant="secondary" onClick={onRetry}>
          Retry
        </Button>
      )}
      {onDismiss && (
        <Button variant="secondary" onClick={onDismiss}>
          Dismiss
        </Button>
      )}
    </div>
  )
}

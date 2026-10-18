import { memo } from 'react'
import { Button } from '../../components/Button'
import type { Expense } from '../../types/expense'
import styles from './ExpenseItem.module.css'

interface ExpenseItemProps {
  expense: Expense
  isDeleting: boolean
  onDelete: (id: string) => void
}

export const ExpenseItem = memo(({ expense, isDeleting, onDelete }: ExpenseItemProps) => {
  return (
    <li className={styles.item}>
      <div className={styles.details}>
        <span className={styles.description}>{expense.description}</span>
        <span className={styles.meta}>
          <span>{expense.date}</span>
          <span>ID: {expense.id}</span>
        </span>
      </div>
      <span className={styles.amount}>{expense.amount.toFixed(2)}</span>
      <Button variant="danger" disabled={isDeleting} onClick={() => onDelete(expense.id)}>
        {isDeleting ? 'Deleting...' : 'Delete'}
      </Button>
    </li>
  )
})

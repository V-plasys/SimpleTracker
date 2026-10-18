import { memo } from 'react'
import type { Expense } from '../../types/expense'
import { ExpenseItem } from './ExpenseItem'
import styles from './ExpenseList.module.css'

interface ExpenseListProps {
  expenses: Expense[]
  deletingIds: Set<string>
  onDelete: (id: string) => void
}

export const ExpenseList = memo(({ expenses, deletingIds, onDelete }: ExpenseListProps) => {
  return (
    <ul className={styles.list}>
      {expenses.map((expense) => (
        <ExpenseItem key={expense.id} expense={expense} isDeleting={deletingIds.has(expense.id)} onDelete={onDelete} />
      ))}
    </ul>
  )
})

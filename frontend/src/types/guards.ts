import type { Expense } from './expense'

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/

export function isExpense(value: unknown): value is Expense {
  if (typeof value !== 'object' || value === null) return false
  const expense = value as Record<string, unknown>

  return (
    typeof expense.id === 'string' &&
    typeof expense.description === 'string' &&
    typeof expense.amount === 'number' &&
    typeof expense.date === 'string' &&
    DATE_RE.test(expense.date)
  )
}

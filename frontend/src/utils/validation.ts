export interface ExpenseFormValues {
  description: string
  amount: string
  date: string
}

export type ExpenseFormErrors = Partial<Record<keyof ExpenseFormValues, string>>

export function validateExpenseForm(values: ExpenseFormValues): ExpenseFormErrors {
  const errors: ExpenseFormErrors = {}

  if (!values.description.trim()) errors.description = 'Description is required'

  if (!values.amount.trim()) errors.amount = 'Amount is required'
  else if (!(Number(values.amount) > 0)) errors.amount = 'Amount must be greater than 0'

  if (!values.date) errors.date = 'Date is required'

  return errors
}

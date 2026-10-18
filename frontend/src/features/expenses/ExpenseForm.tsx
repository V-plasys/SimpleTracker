import { memo, useState, type ChangeEvent, type FormEvent } from 'react'
import { Alert } from '../../components/Alert'
import { Button } from '../../components/Button'
import { TextField } from '../../components/TextField'
import type { NewExpense } from '../../types/expense'
import { validateExpenseForm, type ExpenseFormErrors, type ExpenseFormValues } from '../../utils/validation'
import styles from './ExpenseForm.module.css'

interface ExpenseFormProps {
  onAdd: (data: NewExpense) => Promise<void>
}

const emptyValues: ExpenseFormValues = { description: '', amount: '', date: '' }

export const ExpenseForm = memo(({ onAdd }: ExpenseFormProps) => {
  const [values, setValues] = useState(emptyValues)
  const [errors, setErrors] = useState<ExpenseFormErrors>({})
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const validationErrors = validateExpenseForm(values)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    setSubmitting(true)
    setSubmitError(null)
    try {
      await onAdd({
        description: values.description.trim(),
        amount: Number(values.amount),
        date: values.date,
      })
      setValues(emptyValues)
    } catch {
      setSubmitError('Failed to add expense')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.fields}>
        <TextField
          label="Description"
          name="description"
          value={values.description}
          onChange={handleChange}
          error={errors.description}
          placeholder="e.g. Groceries"
        />
        <TextField
          label="Amount"
          name="amount"
          type="number"
          step="0.01"
          min="0"
          value={values.amount}
          onChange={handleChange}
          error={errors.amount}
          placeholder="0.00"
        />
        <TextField
          label="Date"
          name="date"
          type="date"
          value={values.date}
          onChange={handleChange}
          error={errors.date}
        />
      </div>
      {submitError && <Alert message={submitError} />}
      <div>
        <Button type="submit" disabled={submitting}>
          {submitting ? 'Adding...' : 'Add Expense'}
        </Button>
      </div>
    </form>
  )
})

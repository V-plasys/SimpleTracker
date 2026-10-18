import { Alert } from '../../components/Alert'
import { ExpenseForm } from './ExpenseForm'
import { ExpenseList } from './ExpenseList'
import { useExpenses } from './useExpenses'
import styles from './ExpensesPage.module.css'

export function ExpensesPage() {
  const { expenses, deletingIds, loadStatus, loadError, deleteError, reload, add, remove, dismissDeleteError } =
    useExpenses()

  return (
    <main className={styles.page}>
      <h1>Expense Tracker</h1>

      <section className={styles.card}>
        <h2>Add expense</h2>
        <ExpenseForm onAdd={add} />
      </section>

      <section className={styles.section}>
        <h2>Expenses</h2>

        {loadError && <Alert message={loadError} onRetry={() => reload()} />}
        {deleteError && <Alert message={deleteError} onDismiss={dismissDeleteError} />}

        {loadStatus === 'loading' && expenses.length === 0 && <p className={styles.muted}>Loading...</p>}
        {loadStatus === 'success' && expenses.length === 0 && <p className={styles.muted}>No expenses yet</p>}
        {expenses.length > 0 && <ExpenseList expenses={expenses} deletingIds={deletingIds} onDelete={remove} />}
      </section>
    </main>
  )
}

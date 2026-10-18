import type { Expense, NewExpense } from '../types/expense'
import { isExpense } from '../types/guards'
import { request } from './http'

export async function getExpenses(signal?: AbortSignal): Promise<Expense[]> {
  const payload = await request('/expenses', { signal })
  if (!Array.isArray(payload)) throw new Error('Invalid expenses response')
  return payload.filter(isExpense)
}

export async function createExpense(data: NewExpense): Promise<Expense> {
  const payload = await request('/expenses', { method: 'POST', body: data })
  if (!isExpense(payload)) throw new Error('Invalid expense response')
  return payload
}

export async function deleteExpense(id: string): Promise<void> {
  await request(`/expenses/${id}`, { method: 'DELETE' })
}

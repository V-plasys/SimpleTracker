import { useCallback, useEffect, useMemo, useState } from 'react'
import { createExpense, deleteExpense, getExpenses } from '../../api/expenses'
import { isAbortError } from '../../api/http'
import type { Expense, NewExpense } from '../../types/expense'

type LoadStatus = 'loading' | 'success' | 'error'

export function useExpenses() {
  const [items, setItems] = useState<Expense[]>([])
  const [loadStatus, setLoadStatus] = useState<LoadStatus>('loading')
  const [loadError, setLoadError] = useState<string | null>(null)
  const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set())
  const [deleteError, setDeleteError] = useState<string | null>(null)

  const load = useCallback((signal?: AbortSignal) => {
    getExpenses(signal)
      .then((data) => {
        setItems(data)
        setLoadStatus('success')
      })
      .catch((error: unknown) => {
        if (isAbortError(error)) return
        setLoadStatus('error')
        setLoadError('Failed to load expenses')
      })
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    load(controller.signal)
    return () => controller.abort()
  }, [load])

  const reload = useCallback(() => {
    setLoadStatus('loading')
    setLoadError(null)
    load()
  }, [load])

  const add = useCallback(async (data: NewExpense) => {
    const expense = await createExpense(data)
    setItems((prev) => [...prev, expense])
  }, [])

  const remove = useCallback(async (id: string) => {
    setDeletingIds((prev) => new Set(prev).add(id))
    setDeleteError(null)
    try {
      await deleteExpense(id)
      setItems((prev) => prev.filter((item) => item.id !== id))
    } catch {
      setDeleteError('Failed to delete expense')
    } finally {
      setDeletingIds((prev) => {
        const next = new Set(prev)
        next.delete(id)
        return next
      })
    }
  }, [])

  const dismissDeleteError = useCallback(() => setDeleteError(null), [])

  const expenses = useMemo(() => [...items].sort((a, b) => b.date.localeCompare(a.date)), [items])

  return {
    expenses,
    deletingIds,
    loadStatus,
    loadError,
    deleteError,
    reload,
    add,
    remove,
    dismissDeleteError,
  }
}

import supabase from '../lib/supabaseClient.js'

export const findExpenses = async () => {
  const { data, error } = await supabase
    .from('expenses')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export const createExpense = async (expense) => {
  const { data, error } = await supabase
    .from('expenses')
    .insert([expense])
    .select('*')

  if (error) throw error
  return data?.[0] ?? null
}


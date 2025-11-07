import supabase from '../lib/supabaseClient.js'

export const findIncome = async () => {
  const { data, error } = await supabase
    .from('income')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export const createIncome = async (income) => {
  const { data, error } = await supabase
    .from('income')
    .insert([income])
    .select('*')

  if (error) throw error
  return data?.[0] ?? null
}


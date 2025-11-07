import supabase from '../lib/supabaseClient.js'

export const findActivePaymentMethods = async () => {
  const { data, error } = await supabase
    .from('payment_methods')
    .select('*')
    .eq('is_active', true)
    .order('display_order')

  if (error) throw error
  return data
}

export const createPaymentMethod = async (payload) => {
  const { data, error } = await supabase
    .from('payment_methods')
    .insert([payload])
    .select('*')

  if (error) throw error
  return data?.[0] ?? null
}

export const updatePaymentMethod = async (id, updates) => {
  const { data, error } = await supabase
    .from('payment_methods')
    .update(updates)
    .eq('id', id)
    .select('*')

  if (error) throw error
  return data?.[0] ?? null
}


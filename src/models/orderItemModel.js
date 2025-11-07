import supabase from '../lib/supabaseClient.js'

export const findOrderItems = async ({ orderId } = {}) => {
  let query = supabase.from('order_items').select('*')

  if (orderId) {
    query = query.eq('order_id', orderId)
  }

  const { data, error } = await query

  if (error) throw error
  return data
}

export const createOrderItem = async (item) => {
  const { data, error } = await supabase
    .from('order_items')
    .insert([item])
    .select('*')

  if (error) throw error
  return data?.[0] ?? null
}


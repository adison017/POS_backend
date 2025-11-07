import supabase from '../lib/supabaseClient.js'

export const findOrders = async (options = {}) => {
  const { limit, offset, from, to } = options
  let query = supabase
    .from('orders')
    .select('id, order_no, status, subtotal, grand_total, payment_method, receipt_url, created_at')
    .order('created_at', { ascending: false })

  if (from) {
    query = query.gte('created_at', from)
  }
  if (to) {
    query = query.lte('created_at', to)
  }
  if (typeof limit === 'number' && typeof offset === 'number') {
    query = query.range(offset, Math.max(offset, offset + limit - 1))
  } else if (typeof limit === 'number') {
    query = query.limit(limit)
  }

  const { data, error } = await query
  if (error) throw error
  return data
}

export const createOrder = async (order) => {
  const { data, error } = await supabase
    .from('orders')
    .insert([order])
    .select('id, order_no, status, subtotal, grand_total, payment_method, receipt_url, created_at')

  if (error) throw error
  return data?.[0] ?? null
}

export const updateOrder = async (id, updates) => {
  const { data, error } = await supabase
    .from('orders')
    .update(updates)
    .eq('id', id)
    .select('id, order_no, status, subtotal, grand_total, payment_method, receipt_url, created_at')

  if (error) throw error
  return data?.[0] ?? null
}

export const findLatestOrder = async () => {
  const { data, error } = await supabase
    .from('orders')
    .select('order_no')
    .not('order_no', 'is', null)
    .order('created_at', { ascending: false })
    .limit(1)

  if (error) throw error
  return data?.[0] ?? null
}


import supabase from '../lib/supabaseClient.js'

export const findKitchenTickets = async (limit = 100) => {
  // Ensure limit is within reasonable bounds
  const safeLimit = Math.min(Math.max(limit, 1), 200)
  
  const { data, error } = await supabase
    .from('kitchen_tickets')
    .select('id, order_id, status, created_at, started_at, finished_at')
    .order('created_at', { ascending: false })
    .limit(safeLimit)

  if (error) throw error
  return data
}

export const createKitchenTicket = async (ticket) => {
  const { data, error } = await supabase
    .from('kitchen_tickets')
    .insert([ticket])
    .select('id, order_id, status, created_at')

  if (error) throw error
  return data?.[0] ?? null
}

export const updateKitchenTicket = async (id, updates) => {
  const { data, error } = await supabase
    .from('kitchen_tickets')
    .update(updates)
    .eq('id', id)
    .select('id, order_id, status, updated_at, started_at, finished_at')

  if (error) throw error
  return data?.[0] ?? null
}
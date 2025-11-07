import supabase from '../lib/supabaseClient.js'

export const findKitchenTickets = async () => {
  const { data, error } = await supabase
    .from('kitchen_tickets')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export const createKitchenTicket = async (ticket) => {
  const { data, error } = await supabase
    .from('kitchen_tickets')
    .insert([ticket])
    .select('*')

  if (error) throw error
  return data?.[0] ?? null
}

export const updateKitchenTicket = async (id, updates) => {
  const { data, error } = await supabase
    .from('kitchen_tickets')
    .update(updates)
    .eq('id', id)
    .select('*')

  if (error) throw error
  return data?.[0] ?? null
}


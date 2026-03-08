import supabase from '../lib/supabaseClient.js'

export const findKitchenTickets = async (limit = 100) => {
  // Ensure limit is within reasonable bounds
  const safeLimit = Math.min(Math.max(limit, 1), 200)
  
  // Get the start of the current day (local server time)
  const startOfToday = new Date()
  startOfToday.setHours(0, 0, 0, 0)
  const startOfTodayISO = startOfToday.toISOString()
  
  const { data, error } = await supabase
    .from('kitchen_tickets')
    .select(`
      id, 
      order_id, 
      status, 
      created_at, 
      started_at, 
      finished_at,
      orders (
        order_no,
        order_items (
          id,
          item_id,
          name,
          qty
        )
      )
    `)
    .gte('created_at', startOfTodayISO)
    .order('created_at', { ascending: false })
    .limit(safeLimit)

  if (error) throw error
  return data
}

export const createKitchenTicket = async (ticket) => {
  const { data: inserted, error: insertError } = await supabase
    .from('kitchen_tickets')
    .insert([ticket])
    .select('id')

  if (insertError) throw insertError

  if (!inserted?.[0]?.id) return null

  // Fetch the full ticket with joined orders and order_items
  const { data: fullTicket, error: fetchError } = await supabase
    .from('kitchen_tickets')
    .select(`
      id, 
      order_id, 
      status, 
      created_at, 
      started_at, 
      finished_at,
      orders (
        order_no,
        order_items (
          id,
          item_id,
          name,
          qty
        )
      )
    `)
    .eq('id', inserted[0].id)
    .single()
    
  if (fetchError) throw fetchError
  
  return fullTicket
}

export const updateKitchenTicket = async (id, updates) => {
  const { data: updated, error: updateError } = await supabase
    .from('kitchen_tickets')
    .update(updates)
    .eq('id', id)
    .select('id')

  if (updateError) throw updateError
  
  if (!updated?.[0]?.id) return null

  // Fetch the full ticket with joined orders and order_items
  const { data: fullTicket, error: fetchError } = await supabase
    .from('kitchen_tickets')
    .select(`
      id, 
      order_id, 
      status, 
      created_at, 
      started_at, 
      finished_at,
      updated_at,
      orders (
        order_no,
        order_items (
          id,
          item_id,
          name,
          qty
        )
      )
    `)
    .eq('id', updated[0].id)
    .single()
    
  if (fetchError) throw fetchError
  
  return fullTicket
}
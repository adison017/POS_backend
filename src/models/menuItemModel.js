import supabase from '../lib/supabaseClient.js'

const baseSelect = '*'

export const findActiveMenuItems = async () => {
  const { data, error } = await supabase
    .from('menu_items')
    .select(baseSelect)
    .eq('is_active', true)

  if (error) throw error
  return data
}

export const createMenuItem = async (item) => {
  const { data, error } = await supabase
    .from('menu_items')
    .insert([item])
    .select(baseSelect)

  if (error) throw error
  return data?.[0] ?? null
}

export const updateMenuItem = async (id, updates) => {
  const { data, error } = await supabase
    .from('menu_items')
    .update(updates)
    .eq('id', id)
    .select(baseSelect)

  if (error) throw error
  return data?.[0] ?? null
}


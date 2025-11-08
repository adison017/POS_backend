import supabase from '../lib/supabaseClient.js'

export const findActiveMenuCategories = async () => {
  const { data, error } = await supabase
    .from('menu_categories')
    .select('*')
    .eq('is_active', true)
    .order('display_order')

  if (error) throw error
  return data
}

// Add function to fetch all menu categories (for admin management)
export const findAllMenuCategories = async () => {
  const { data, error } = await supabase
    .from('menu_categories')
    .select('*')
    .order('display_order')

  if (error) throw error
  return data
}

export const createMenuCategory = async (category) => {
  const { data, error } = await supabase
    .from('menu_categories')
    .insert([category])
    .select()

  if (error) throw error
  return data?.[0] ?? null
}

export const updateMenuCategory = async (id, updates) => {
  const { data, error } = await supabase
    .from('menu_categories')
    .update(updates)
    .eq('id', id)
    .select()

  if (error) throw error
  return data?.[0] ?? null
}
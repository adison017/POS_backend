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

// Add delete function for menu categories
export const deleteMenuCategory = async (id) => {
  try {
    // First check if there are any menu items associated with this category
    const { data: items, error: itemsError } = await supabase
      .from('menu_items')
      .select('id')
      .eq('category_id', id)
      .limit(1);
      
    if (itemsError) throw itemsError;
    
    // If there are items in this category, we can't delete it
    if (items && items.length > 0) {
      throw new Error('ไม่สามารถลบหมวดหมู่ที่มีเมนูอาหารอยู่ได้ กรุณาย้ายเมนูอาหารในหมวดหมู่นี้ก่อน');
    }
    
    // If no items, proceed with deletion
    const { data, error } = await supabase
      .from('menu_categories')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error deleting menu category:', error);
    throw error;
  }
}

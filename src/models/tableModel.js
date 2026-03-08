import supabase from '../lib/supabaseClient.js'

const baseSelect = '*'

export const getAllTables = async () => {
    const { data, error } = await supabase
        .from('tables')
        .select(baseSelect)
        .order('label', { ascending: true })

    if (error) throw error
    return data
}

export const createTable = async (table) => {
    const { data, error } = await supabase
        .from('tables')
        .insert([table])
        .select(baseSelect)

    if (error) throw error
    return data?.[0] ?? null
}

export const updateTable = async (id, updates) => {
    const { data, error } = await supabase
        .from('tables')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select(baseSelect)

    if (error) throw error
    return data?.[0] ?? null
}

export const deleteTable = async (id) => {
    const { data, error } = await supabase
        .from('tables')
        .delete()
        .eq('id', id)
        .select()

    if (error) throw error
    return data
}

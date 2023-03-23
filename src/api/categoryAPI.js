import {assertIsLoggedIn} from './utils/getUser.js';
import supabaseClient from './utils/supabaseClient.js';
import {performSupabaseQuery} from './utils/performSupabaseQuery.js';
import {useQuery} from "@tanstack/react-query";

//region Mutations & queries
/**
 * ---------------------------------------------------------------------------------------------------------------------
 *                                          MUTATIONS & QUERIES
 * ---------------------------------------------------------------------------------------------------------------------
 */
export const useGetAllCategories = () =>{
    return useQuery(
        ['project_react_expense'],
        ()=> getAllCategories(),
        {}
    )
}

//endregion

//region Supabase functions
/**
 * ---------------------------------------------------------------------------------------------------------------------
 *                                          Supabase functions
 * ---------------------------------------------------------------------------------------------------------------------
 */

/**
 * Retrieve a list of all the categories.
 *
 * @returns {Promise<{id: int, name: string}[]>}
 */
const getAllCategories = async () => {
    await assertIsLoggedIn()

    const query = supabaseClient
        .from('project_react_category')
        .select('*')

    return await performSupabaseQuery(query)
}

/**
 * Add a new category to the database.
 *
 * @param name {string} The name of the category.
 * @returns {Promise<{id: int, name: string}>} The newly created category.
 */
const createCategory = async ({name}) => {
    await assertIsLoggedIn()

    const newCategory = {
        name,
    }

    const query = supabaseClient
        .from('project_react_category')
        .insert(newCategory)
        .select()
        .single()

    return await performSupabaseQuery(query)
}

//endregion
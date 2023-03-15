import {assertIsLoggedIn} from './utils/getUser.js';
import supabaseClient from './utils/supabaseClient.js';
import {performSupabaseQuery} from './utils/performSupabaseQuery.js';

//region Mutations & queries
/**
 * ---------------------------------------------------------------------------------------------------------------------
 *                                          MUTATIONS & QUERIES
 * ---------------------------------------------------------------------------------------------------------------------
 */


//endregion

//region Supabase functions


/**
 * ---------------------------------------------------------------------------------------------------------------------
 *                                          Supabase functions
 * ---------------------------------------------------------------------------------------------------------------------
 */

/**
 * Retrieve a list of all currencies.
 *
 * @returns {Promise<{id: int, name: string, iso: string, symbol: string}[]>}
 */
const getAllCurrencies = async () => {
    await assertIsLoggedIn()

    const query = supabaseClient
        .from('project_react_currency')
        .select('*')

    return await performSupabaseQuery(query)
}

/**
 * Add a new currency to the database.
 *
 * @param name {string} The name of the currency.
 * @param symbol {string} The symbol of the currency, i.e. €, $, ...
 * @param iso {string} The ISO code of the currency, i.e. EUR, USD, CAD, ...
 * @returns {Promise<{id: int, name: string, iso: string, symbol: string}>} The newly created currency.
 */
const createCurrency = async ({name, symbol, iso}) => {
    await assertIsLoggedIn()

    const newCurrency = {
        name,
        symbol,
        iso
    }

    const query = supabaseClient
        .from('project_react_currency')
        .insert(newCurrency)
        .select()
        .single()

    return await performSupabaseQuery(query)
}

//endregion
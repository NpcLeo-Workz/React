import supabaseClient from './utils/supabaseClient.js'
import {getUser} from './utils/getUser.js'
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
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
 * Log in with an email account and password.
 *
 * @param email {string} The email address that will be used to identify the user.
 * @param password {string} The user's password.
 */
const login = async ({email, password}) => {
    const {error} = await supabaseClient.auth.signInWithPassword({email, password})
    if (error) {
        throw error
    }
}

/**
 * Register a new account
 *
 * @param email {string} The email address for the new user.
 * @param password {string} The password for the new user.
 * @param username {string} The username for the new user.
 * @return {Promise<void>}
 */
export const register = async ({email, password, username}) => {
    if (email === '' || password === '' || username === '' || !email || !password || !username) {
        throw new Error(`Email, password and username must be defined and can't be an empty string.`)
    }

    const {error} = await supabaseClient.auth.signUp({email, password})

    if (error) {
        throw error
    }
}

//end region

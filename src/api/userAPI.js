import supabaseClient from './utils/supabaseClient.js'
import {getUser} from './utils/getUser.js'
import {useQuery, useQueryClient, useMutation} from '@tanstack/react-query'
//region Mutations & queries
/**
 * ---------------------------------------------------------------------------------------------------------------------
 *                                          MUTATIONS & QUERIES
 * ---------------------------------------------------------------------------------------------------------------------
 */
export const useAuthenticate = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({email, password, username}) => {
            if (username) {
                await register({email, password, username})
            } else if (password) {
                await login({email, password})
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['profile']})
        }
    })
}
/**
 * Retrieve the profile and id of the currently logged in user.
 * @return {Promise<{id: string, updatedAt: string, username: string}>}
 * when something went wrong.
 */
const fetchProfile  =  async () => {
    const user =  await getUser()
    if(!user){
        return null
    }
    const {data, error} = await supabaseClient
        .from('profiles')
        .select(`*`)
        .eq('id', user.id)
        .maybeSingle()

    if (error) {
        throw error
    }

    return {
        id: user?.id,
        ...data,
    }
}
export const useGetProfile = () => {
    return useQuery(
        ['profile'],
        fetchProfile,
        {
            staleTime: Infinity,
            cacheTime: Infinity
        }
    )
}
export const useSignOut = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: () => supabaseClient.auth.signOut(),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ['profile']})
        }
    })
}
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
export const login = async ({email, password}) => {
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
    const {error: profileError} = await upsertProfile({
        username
    })

    if (profileError) {
        throw error
    }
}
const upsertProfile = async ({username}) =>{
    const profile = await fetchProfile()
    const updates = {
        id: profile.id,
        updatedAt: new Date(),
        username:  username ?? profile?.username
    }
    let {error, data} = await supabaseClient
        .from('profiles')
        .upsert(updates)
        .select()
    if (error) {
        throw error
    }
    return data
}
//end region

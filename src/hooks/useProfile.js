import {useGetProfile} from '../API/userAPI.js'

const useProfile = () => {
    const {data: profile, isError} = useGetProfile()
    const isAuthenticated = !!profile?.id && !isError
    const isNotAuthenticated = !isAuthenticated

    return {
        profile,
        isAuthenticated,
        isNotAuthenticated
    }

}

export default useProfile

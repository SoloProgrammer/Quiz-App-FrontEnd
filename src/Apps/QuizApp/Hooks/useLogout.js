import { setUser } from "../Redux/Slices/UserSlice"
import { useDispatch } from "react-redux"
export const useLogout = () => {
    const dispatch = useDispatch()
    function logout() {
        localStorage.removeItem('token')
        window.location.href = window.location.origin + '/login'
        setTimeout(() => {
            dispatch(setUser(null))
        }, 500);
    }
    return [logout]
}

export default useLogout

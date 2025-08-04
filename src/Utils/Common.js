
export const Logout = () =>
{
    localStorage.removeItem("currentUser")
    localStorage.removeItem("token")
    localStorage.removeItem("refreshToken")
    localStorage.removeItem("userName")
}


const initialState = {
    username: localStorage.getItem('username'),
    isLoggedIn: false,
    role: localStorage.getItem('role'),
    userID: ""
}

export default function UserReducer(state = initialState, action) {
    switch (action.type) {
        case "login.reply":
            if (action.data.success) {
                localStorage.setItem('username', action.data.data.username)
                localStorage.setItem('role', action.data.data.role)
                return {
                    ...state,
                    isLoggedIn: action.data.success,
                    username: action.data.data.username,
                    role: action.data.data.role,
                    userID: action.data.data.id,
                }
            }
        case "register.reply":
            if (action.data.success) {
                localStorage.setItem('username', action.data.data.username)
                return {
                    ...state,
                    isLoggedIn: action.data.success,
                    username: action.data.data.username,
                    userID: action.data.data.id,
                }
            }
        case "changeUserID":
            return {
                ...state,
                userID: action.data
            }

        default:
            return state

    }
}


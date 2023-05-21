export const getAPIs = {
    login: {
        name: "login",
        path: "/api/auth/login",
        method: "POST",
    },
    register: {
        name: "register",
        path: "/api/auth/register",
        method: "POST",
    },
    updateUser: {
        name: "updateUser",
        path: "/api/auth/updateUser/",
        method: "POST",
    },
    getUser: {
        name: "getUser",
        path: "/api/auth/getUser/",
        method: "GET",
    },
    changePassword: {
        name: "changePassword",
        path: "/api/auth/changePassword/",
        method: "POST",
    },
    createService: {
        name: "createService",
        path: "/api/report/createService/",
        method: "POST",
    },
    getAllService: {
        name: "getAllService",
        path: "/api/report/getAllService/",
        method: "GET",
    },
    searchProfile: {
        name: "searchProfile",
        path: "/api/auth/searchProfile/",
        method: "POST",
    },
    requestAI: {
        name: "requestAI",
        path: "/api/report/requestAI/",
        method: "POST",
    },
    savePreset: {
        name: "savePreset",
        path: "/api/report/savePreset",
        method: "POST"
    }
};
import usersJSON from '../users.json'

export function fetchUserList() {
    const request = new Promise((resolve, reject) => {
        setTimeout(function () {//request delay simulation
            resolve(usersJSON)
        }, 250)
    })

    return function (dispatch) {
        request.then(({ users }) => {
            dispatch({ type: "FETCH_USER_LIST", payload: users })
        })
    }
}
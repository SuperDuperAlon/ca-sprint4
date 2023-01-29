import { storageService } from './async-storage.service'
import { httpService } from './http.service'
import { utilService } from './util.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
const STORAGE_KEY = 'user_db'
// _createUsers()

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    saveLocalUser,
    getUsers,
    getById,
    remove,
    update,
    changeScore
}

window.userService = userService


function getUsers() {
    // return storageService.query(STORAGE_KEY)
    return httpService.get(`user`)
}



async function getById(userId) {
    // const user = await storageService.get('user', userId)
    const user = await httpService.get(`user/${userId}`)
    return user
}

function remove(userId) {
    // return storageService.remove('user', userId)
    return httpService.delete(`user/${userId}`)
}

async function update({_id, score}) {
    // const user = await storageService.get('user', _id)
    // user.score = score
    // await storageService.put('user', user)

    const user = await httpService.put(`user/${_id}`, {_id, score})
    // Handle case in which admin updates other user's details
    if (getLoggedinUser()._id === user._id) saveLocalUser(user)
    return user
}

async function login(userCred) {
    try{
        // const users = await storageService.query(STORAGE_KEY)
        // const user = users.find(user => user.username === userCred.username)
        // console.log(users);
        const user = await httpService.post('auth/login', userCred)
        if (user) {
            // socketService.login(user._id)
            return saveLocalUser(user)
        }
    
    } catch(err){
        console.log(err)
    }
}

async function signup(userCred) {
    // userCred.score = 10000
    // if (!userCred.imgUrl) userCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
    // const user = await storageService.post(STORAGE_KEY, userCred)
    const user = await httpService.post('auth/signup', userCred)
    // socketService.login(user._id)
    return saveLocalUser(user)  
}
async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    // socketService.logout()
    // return await httpService.post('auth/logout')
}

async function changeScore(by) {
    const user = getLoggedinUser()
    if (!user) throw new Error('Not loggedin')
    user.score = user.score + by || by
    await update(user)
    return user.score
}



function saveLocalUser(user) {
    user = {_id: user._id, fullname: user.fullname, imgUrl: user.imgUrl, score: user.score}
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}
function _createUsers(){
    let users = utilService.loadFromStorage(STORAGE_KEY)
      if (!users || !users.length) {
        users = [
            {
                "_id": "u101",
                "fullname": "User 1",
                "imgUrl": "/img/img1.jpg",
                "username": "user1",
                "password": "secret"
              },
              {
                "_id": "u102",
                "fullname": "Dudi Du",
                "imgUrl": "/img/img2.jpg",
                "username": "user2",
                "password": "secret",
                // "isOwner" : true // OPTIONAL
              }
        ]
        utilService.saveToStorage(STORAGE_KEY, users)
      }
}
// (async ()=>{
//     await userService.signup({fullname: 'Puki Norma', username: 'puki', password:'123',score: 10000, isAdmin: false})
//     await userService.signup({fullname: 'Master Adminov', username: 'admin', password:'123', score: 10000, isAdmin: true})
//     await userService.signup({fullname: 'Muki G', username: 'muki', password:'123', score: 10000})
// })()




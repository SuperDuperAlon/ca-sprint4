import { stayService } from './services/stay.service.js'
import { userService } from './services/user.service.js'
import { utilService } from './services/util.service.js'

console.log('Simple driver to test some API calls')

window.onLoadStays = onLoadStays
window.onLoadUsers = onLoadUsers
window.onAddStay = onAddStay
window.onGetStayById = onGetStayById
window.onRemoveStay = onRemoveStay
window.onAddStayMsg = onAddStayMsg

async function onLoadStays() {
    const stays = await stayService.query()
    render('Stays', stays)
}
async function onLoadUsers() {
    const users = await userService.query()
    render('Users', users)
}

async function onGetStayById() {
    const id = prompt('Stay id?')
    if (!id) return
    const stay = await stayService.getById(id)
    render('Stay', stay)
}

async function onRemoveStay() {
    const id = prompt('Stay id?')
    if (!id) return
    await stayService.remove(id)
    render('Removed Stay')
}

async function onAddStay() {
    await userService.login({ username: 'muki', password: '123' })
    const savedStay = await stayService.save(stayService.getEmptyStay())
    render('Saved Stay', savedStay)
}

async function onAddStayMsg() {
    await userService.login({ username: 'muki', password: '123' })
    const id = prompt('Stay id?')
    if (!id) return

    const savedMsg = await stayService.addStayMsg(id, 'some msg')
    render('Saved Msg', savedMsg)
}

function render(title, mix = '') {
    console.log(title, mix)
    const output = utilService.prettyJSON(mix)
    document.querySelector('h2').innerText = title
    document.querySelector('pre').innerHTML = output
}


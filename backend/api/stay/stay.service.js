const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const utilService = require('../../services/util.service')
const ObjectId = require('mongodb').ObjectId
const stays = require('../../data/stay.json')
const { log } = require('../../middlewares/logger.middleware')
const fs = require('fs')

async function query(filterBy={txt:''}) {
    try {
        let filteredStays = stays
        // const criteria = {
        //     vendor: { $regex: filterBy.txt, $options: 'i' }
        // }
        // const collection = await dbService.getCollection('stay')
        // var stays = await collection.find(criteria).toArray()
        // const stays = 
        if (filterBy.name) {
            const regex = new RegExp(filterBy.name, 'i')
            filteredStays = filteredStays.filter(stay => regex.test(stay.name))
        }

        console.log(filteredStays);
        return filteredStays
    } catch (err) {
        logger.error('cannot find stays', err)
        throw err
    }
}

async function getById(stayId) {
    try {
        // const collection = await dbService.getCollection('stay')
        // const stay = collection.findOne({ _id: ObjectId(stayId) })
        const stay = stays.find(stay => stay._id === stayId)
        if (!stay) return Promise.reject('Stay not found')
        return stay
    } catch (err) {
        logger.error(`while finding stay ${stayId}`, err)
        throw err
    }
}

async function remove(stayId) {
    try {
        // const collection = await dbService.getCollection('stay')
        // await collection.deleteOne({ _id: ObjectId(stayId) })
        // return stayId
        const idx = stays.findIndex(stay => stay._id === stayId)
        if (idx === -1) return Promise.reject('No Such stay')
        stays.splice(idx, 1)
        return _writeStaysToFile()
    } catch (err) {
        logger.error(`cannot remove stay ${stayId}`, err)
        throw err
    }
}

async function add(stay) {
    try {
        // const collection = await dbService.getCollection('stay')
        // await collection.insertOne(stay)
        stay._id = _makeId()
        // stay.name = 'this is a name'
        // stay.price = 100000
        stays.push(stay)
        return _writeStaysToFile().then(() => stay)
    } catch (err) {
        logger.error('cannot insert stay', err)
        throw err
    }

}

async function update(stay) {
    try {
        // const stayToSave = {
        //     vendor: stay.vendor,
        //     price: stay.price
        // }

        const stayToUpdate = stays.find(currStay => currStay._id === stay._id)
        if (!stayToUpdate) return Promise.reject('No such stay')

        stayToUpdate.name = stay.name
        stayToUpdate.price = stay.price
        // stayToUpdate.inStock = stay.inStock
        // const collection = await dbService.getCollection('stay')
        // await collection.updateOne({ _id: ObjectId(stay._id) }, { $set: stayToSave })
        return _writeStaysToFile().then(() => stay)
    } catch (err) {
        logger.error(`cannot update stay ${stayId}`, err)
        throw err
    }
}

async function addStayMsg(stayId, msg) {
    try {
        msg.id = utilService.makeId()
        const collection = await dbService.getCollection('stay')
        await collection.updateOne({ _id: ObjectId(stayId) }, { $push: { msgs: msg } })
        return msg
    } catch (err) {
        logger.error(`cannot add stay msg ${stayId}`, err)
        throw err
    }
}

async function removeStayMsg(stayId, msgId) {
    try {
        const collection = await dbService.getCollection('stay')
        await collection.updateOne({ _id: ObjectId(stayId) }, { $pull: { msgs: {id: msgId} } })
        return msgId
    } catch (err) {
        logger.error(`cannot add stay msg ${stayId}`, err)
        throw err
    }
}


function _writeStaysToFile() {
    return new Promise((res, rej) => {
        const data = JSON.stringify(stays, null, 2)
        fs.writeFile('data/stay.json', data, (err) => {
            if (err) return rej(err)
            // console.log("File written successfully\n");
            res()
        })
    })
}

function _makeId(length = 5) {
    let text = ''
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}

module.exports = {
    remove,
    query,
    getById,
    add,
    update,
    addStayMsg,
    removeStayMsg
}

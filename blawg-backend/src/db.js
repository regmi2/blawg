
import { MongoClient } from 'mongodb'


let db

async function connectToDB(callback) {
    //setting up Mongoclient connection
	const client = new MongoClient('mongodb://127.0.0.1:27017')
    await client.connect()


	//find DB and run updateOne() function to update vote count
    db = client.db('blawg-db')
    callback()
}

export {
    db,
    connectToDB
}
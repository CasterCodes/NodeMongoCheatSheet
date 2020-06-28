const MongoClient = require('mongodb').MongoClient

// connection url
const url = "mongodb://localhost/"

//database 
const database = "mongo"

// create a new mongo client
const  client = new MongoClient(url)

// connect to the client
client.connect((error) => {
      if(error) console.log(error)
      const db = client.db(database)
      console.log("Connected ")
      insertDocument(db, () => findAll(db,() => client.close()))
})


const insertDocument = (db, callback) => {
          const collection = db.collection("Posts")
          const data = {
                name:"John Doe",
                email:"john@gmail.com"
          }
          collection.insert(data, (error, result) => {
                   if (error) console.log(error)
                   console.log(result)
                   callback(result)
          })
}
const findAll  = (db, callback) => {
        const collection = db.collection('Posts')
        collection.find({}).toArray((error, result) => {
                if (error) console.log(error);
                console.log(result)
                callback(result)
        })
}

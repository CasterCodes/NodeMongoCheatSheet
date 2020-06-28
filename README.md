# This is a mongo cheatsheet

## First step install mongo

Note that you need to install mongo database from this website [Mongo Database]('', "This is the official mongodb website")

## Install mongodb using the code below

```bash
 npm install mongodb
```

With this command mongodb will be installed as a dependence

## create a file called `app.js` in your directory

### In app.js require the mongodb and create a MongoClient, and connect to mongo database

```javascript
const mongo = require("mongodb");

// MongoClient
const MongoClient = mongo.MongoClient();

// connection url
const url = "mongodb://localhost/blog";
```

### create a connection

```javascript
MongoClient.connect(url, (error, client) => {
     if(error) throw that error

     // if there is no error do this
     console.log("Connected")

     // close the connection
     client.close()

})

```

### Create a collection

```javascript
MongoClient.connect(url, (error, client) => {
  if (error) throw error;
  // no error

  const db = client.db("blog");
  db.createCollection("Users", (error, res) => {
    if (error) throw error;

    // no error
    console.log("Collection created" + res);
  });

  // close connection
  client.close();
});
```

### Create a single document

```javascript
MongoClient.connect(url, (err, client) => {
  if (err) throw err;
  const db = client.db("mongo");

  // document to be inserted
  const newUser = {
    name: "Kevin Caster",
    age: 24,
    sex: "male",
  };
  db.collection("Users").insertOne(newUser, (error, res) => {
    if (error) throw error;
    console.log("Document inserted" + res);
  });

  // close connection
  client.close();
});
```

### Create many documents

```javascript
MongoClient.connect(url, (error, client) => {
  const db = client.db("blog");

  const document = [
    {
      name: "John Doe",
      age: 30,
      sex: "Male",
    },
    {
      name: "Elizabeth Cane",
      age: 28,
      sex: "Female",
    },
    {
      name: "Jane Caster",
      age: 24,
      sex: "Female",
    },
  ];

  db.collection("Users").insertMany(document, (error, res) => {
    if (error) console.log(error);

    // no error
    console.log("Documents added" + res);
  });
  // close connection
  client.close();
});
```

### findOne - return the first document that occurs

```javascript
MongoClient.connect(url, (error, client) => {
  if (error) throw error;
  const db = client.db("blog");

  // no error
  db.collection("Users").findOne({}, (error, res) => {
    if (error) throw error;

    // no error // consoles the first result that occurs
    console.log(res);
  });
  // close connection
  client.close();
});
```

### find all documents

```javascript
MongoClient.connect(url, (error, client) => {
  if (error) throw error;

  // no error
  const db = client.db("blog");
  db.collection("Users")
    .find()
    .toArray((error, res) => {
      // error
      if (error) throw error;

      // no error
      console.log(res);
    });
  // close connection
  client.close();
});
```

### Filter documents

Where name is John Doe

```javascript
// filter documents
MongoClient.connect(url, (error, client) => {
  // error occurs
  if (error) throw error;

  // no error
  const db = client.db("blog");
  db.collection("Users")
    .find({ name: "John Doe" })
    .toArray((error, res) => {
      // error occurs
      if (error) throw error;

      // no errors
      console.log(res);
    });

  // close connection
  client.close();
});
```

### Get some values from the database

The second parameter of the find method is an object `projection` which specifies which fields to be included in the result

```javascript
// find some values

MongoClient.connect(url, (error, client) => {
  // error occurs
  if (error) throw error;

  // no error
  const db = client.db("blog");

  // from specific collection
  // name and sex should be included in the search result
  db.collection("Users")
    .find(
      {},
      {
        projection: {
          name: 1,
          sex: 1,
          _id: 0,
        },
      }
    )
    .toArray((error, res) => {
      // error occurs
      if (error) throw error;

      // on error

      console.log(res);

      // close connection
      client.close();
    });
});
```

### Delete one document using `deleteOne()` method

```javascript
// Delete one document
MongoClient.connect(url, (error, client) => {
  // error occurs
  if (error) throw error;

  // no error
  db = client.db("blog");

  db.collection("Users").deleteOne({ name: "John Doe" }, (error, res) => {
    // error occurs
    if (error) throw error;

    // no error
    console.log("Document deleted");
  });
  // close connection
  client.close();
});
```

### Delete many document using the `deleteMany()` method

```javascript
MongoClient.connect(url, (error, client) => {
  // error occurs
  if (error) throw error;

  // No error
  const db = client.db("blog");

  // specific collection
  db.collection("Users").deleteMany({ name: "John Doe" }, (error, res) => {
    // error occurs
    if (error) throw error;

    // no error
    console.log("Documents deleted");
  });

  // close connection
  client.close();
});
```

### update one document using `updateOne()` method

```javascript
// update one
MongoClient.connect(url, (error, client) => {
  // error occurs
  if (error) throw error;

  // no error
  const db = client.db("blog");

  db.collection("Users").updateOne(
    { name: "Jane Caster" },
    {
      $set: {
        name: "Judith Caster",
      },
    },
    (error, res) => {
      // error occurs
      if (error) throw error;

      // no error
      console.log("Document updated", +res);
    }
  );
});
```

### update many documents using `updateMany()` method

```javascript
// update many
MongoClient.connect(url, (error, client) => {
  // error occurs
  if (error) throw error;

  // no error
  const db = client.db("blog");

  db.collection("Users").updateMany(
    { name: "Judith Caster" },
    {
      $set: {
        name: "Elizabeth Caster",
      },
    },
    (error, res) => {
      // error occurs
      if (error) throw error;

      // no error
      console.log("Documents updated");
    }
  );
  client.close();
});
```

### Limiting results using `limit(4)` method

```javascript
// limit
MongoClient.connect(url, (error, client) => {
  if (error) throw error;

  // no error
  const db = client.db("blog");

  db.collection("Users")
    .find()
    .limit(2)
    .toArray((error, res) => {
      // error oocurs
      if (error) throw error;

      // no error
      console.log(res);
    });

  client.close();
});
```

### Sorting data using `sort({age:1})` method

```javascript
// sorting result
// {age:1} ascending order
// {age:-1} descending order

MongoClient.connect(url, (error, client) => {
  // error occurs
  if (error) console.log(error);

  // no error
  const db = client.db("mongo");
  db.collection("Users")
    .find()
    .sort({ age: 1 })
    .toArray((error, res) => {
      // error occurs
      if (error) console.log(error);

      // no error
      console.log(res);
    });
  client.close();
});
```

### Drop a collection

```javascript
   MongoClient.connect(url, (error, client) => {
        // error occurs
        if(error) throw error

        // no error
        const db = client.db('blog');
       db.collection('Users').drop(error, deleted){
            // error occurs
            if(error) throw error

            // deleted
            if(deleted) console.log('Collection deleted')
       }
       // close connection
       client.close()
   })
```

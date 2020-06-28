const mongo = require("mongodb");

// mongo client
const MongoClient = mongo.MongoClient;

// connection url
// const url = "mongodb://localhost/mongo"; // without port number
const url = "mongodb://localhost/blog";

// create a connection
MongoClient.connect(url, (error, client) => {
  if (error) throw error;
  console.log("connected");
  client.close();
});

// create a collection
MongoClient.connect(url, (error, client) => {
  const db = client.db("mongo");
  db.createCollection("Users", (error, res) => {
    if (error) throw error;
    console.log("collection created" + res);
    client.close();
  });
});

// insert a document to the colection created
MongoClient.connect(url, (err, client) => {
  if (err) throw err;
  const db = client.db("blog");

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

// insert many documents
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

  client.close();
});

// findOne document - returns the first occurence
MongoClient.connect(url, (error, client) => {
  if (error) throw error;
  const db = client.db("blog");

  // no error
  db.collection("Users").findOne({}, (error, res) => {
    if (error) throw error;

    // no error // consoles the first result that occurs
    console.log(res);
  });
  //close connection
  client.close();
});

// find all documents
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

  //close connection
  client.close();
});

// find some values

MongoClient.connect(url, (error, client) => {
  // error occurs
  if (error) throw error;

  // no error
  const db = client.db("blog");

  // from specific collection
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
    });

  //close connection
  client.close();
});

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

// delete many

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
  // close connection
  client.close();
});

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

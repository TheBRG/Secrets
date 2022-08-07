const mongoose = require('mongoose');

main().catch(err => console.log(err));

//All your code run in the main function
async function main() {
  ////If it doesn't exist, it will create a database
  await mongoose.connect("mongodb://localhost:27017/fruitsDB", {
    useNewUrlParser: true
  });

  // Consider schema as a building, and we list all the material we need for this building to create rooms
  const fruitSchema = new mongoose.Schema({
    name: String,
    rating: {
      type: Number,
      min: 1,
      max: 10
    },
    review: String
  });
  // Consider model is a class, a building's name, it tells us which building and material we should look for.
  const Fruit = mongoose.model("Fruit", fruitSchema);

  // Now, let's create a room called fruit
  const fruit = new Fruit({
    name: {
      type: String,
      required: [true, "Please check your data entry, no name specified!"]
    },
    rating: 10,
    review: "Peaches are so yummy"
  });

  // fruit.save();

  const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favouriteFruit: fruitSchema
  });

  const Person = mongoose.model("Person", personSchema);

  const snapple = new Fruit({
    name: "Snapple",
    score: 8,
    review: "It has some bite to it!"
  });

  // snapple.save();

  // const person = new Person({
  //   name: "John",
  //   age: 37
  // });

  // const person = new Person({
  //   name: "Amy",
  //   age: 12,
  //   favouriteFruit: pineapple
  // });

  // person.save();

  // const kiwi = new Fruit({
  //   name: "Kiwi",
  //   score: 10,
  //   review: "The best fruit!"
  // });
  //
  // const orange = new Fruit({
  //   name: "Orange",
  //   score: 4,
  //   review: "Too sour for me"
  // });
  //
  // const banana = new Fruit({
  //   name: "Banana",
  //   score: 3,
  //   review: "Weird texture"
  // });

  // Fruit.insertMany([kiwi, orange, banana], function(err) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log("Successfully saved all the fruits to fruitsDB.");
  //    }
  // });


  Fruit.find(function(err, fruits) {
    if (err) {
      console.log(err);
    } else {
      mongoose.connection.close();
      fruits.forEach(function(fruit) {
        console.log(fruit.name);
      });
    }
  });

  Person.updateOne({name: "John"}, {favouriteFruit: snapple}, function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log("New favourite updated!");
    };
  });
  // Fruit.updateOne({_id: "62e685f12699466d512f56c5"}, {name: "Peach"}, function(err) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log("Successfully updated document!");
  //   };
  // });

  // Fruit.deleteOne({name: "Peach"}, function(err) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log("Successfully deleted document!");
  //   };
  // });

  // Person.deleteMany({name: "John"}, function(err) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log("Successfully eliminated John.");
  //   };
  // });

  //Save in the database.
  // await person.save();
  // await fruit.save();
};

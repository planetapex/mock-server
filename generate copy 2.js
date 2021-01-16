var faker = require("faker");
var _ = require("lodash");

 function localDb() {
   

   var obj = {
     users: _.times(100, function (n) {
       return {
         id: n,
         firstname: faker.name.firstName(),
         lastname: faker.name.lastName(),
         email: faker.internet.email(),
         password: faker.internet.password(),
         age: faker.random.number({
           min: 25,
           max: 50,
           precision: 2
         }),
         avatar: faker.internet.avatar(),
         owner_id: 100

       };
     })
   };
   return obj;
 };

 module.exports = localDb;
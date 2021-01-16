var faker = require("faker");
var _ = require("lodash");

 function localDb() {
   

   var obj = {
     prop: _.times(4, function (n) {
       return {
         id: n,
         platformId: faker.random.arrayElement([1,2]),
         platform: faker.random.arrayElement(["Booking","Airbnb"]),        
         propertyId: faker.random.number({
           min: 25,
           max: 50,
           precision: 2
         }),
         propertyName: faker.random.arrayElement(["CW001","DT343","EG1232", "ZX123"])
         link: faker.random.arrayElement(["http://assad.com","http://bbbb.com","http://cccc.com","http://ddddd.com"])       

       };
     })
   };
   return obj;
 };

 module.exports = localDb;
const mongoose = require('mongoose');
const initdata=require("./data.js");
const lists=require("../model/schema.js");


main().then((res)=>{
    console.log("connection is sucsses")
}).catch((err)=>{
    console.log(err)
})
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/airbin');
 
}

let initdb=  async ()=>{
    await lists.deleteMany({});
    initdata.data=initdata.data.map((obj)=>({...obj,owner:"66683c29894402259bb19fa7"}))
    await lists.insertMany(initdata.data)
    console.log("working")
}

initdb();
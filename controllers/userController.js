const db = require('../models');
const bcrypt = require("bcrypt")     
//create main model

const User = db.stud
const Product = db.product


//1. Create Users

const addUsers = async(req, res)=>{


    Objbg = {                                      // Creating a JSON Object with required variables of Payload.
        "first_name": req.body.first_name,
        "last_name": req.body.last_name,
        "password": req.body.password,
        "username": req.body.username        
    };
    const date = new Date();
    if(validateThree(req)&&validateTwo(req)&&validateOne(req)&&(JSON.stringify(req.body) == JSON.stringify(Objbg))){

    const username = req.body.username;
    let u = await User.findOne({where:{username:username}})
    if(!u){

        bcrypt.hash(req.body.password, 10).then(hash => { 
        let info ={
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            username: req.body.username,
            password: hash,
            account_created: date.toISOString(),
            account_updated: date.toISOString()
        }

  User.create(info).then((user)=>{
    res.status(200).send({

       "id": user.id,
        "first_name": user.first_name,
        "last_name": user.last_name,
        "username": user.username,
        "account_created": user.account_created,
        "account_updated": user.account_updated

    })})
 }) }
    else{res.status(400).send("Bad Request");}
}
    else{res.status(400).send("Bad Request");} 

}
// Get all Users
const getAllUsers = async (req, res) => {


    let users = await User.findAll({
        attributes: [
            'id',
            'first_name',
            'last_name',
            'username',
            'account_created',
            'account_updated'
        ]
    })
    res.status(200).send(users)

}

//Get Single User

const getUser = async (req, res) => {
    let id = req.params.id;

     if(req.get('Authorization')){

        const credentials = Buffer.from(req.get('Authorization').split(' ')[1], 'base64').toString().split(':')
        const username = credentials[0]
        const password = credentials[1]

        let users = await User.findOne({where:{id:id, username:username}})
        if(users){

    bcrypt.compare(password, users.password, (err, result) => {
        if(result){
         const p = users;
    res.status(200).send({
        id: p.id,
        first_name: p.first_name, 
        last_name: p.last_name,
        username: p.username,
        account_created: p.account_created,
        account_updated: p.account_updated
    })}
    else{
        res.status(401).send("Unauthorized");
    }

})}
else {res.status(401).send("Unauthorized");}
}
else{res.status(403).send("Forbidden");}

}

//Update User

const updateUsers = async (req, res) => {
  const date = new Date();
    const id = req.params.id;
    Objbg = {                                      // Creating a JSON Object with required variables of Payload.
        "first_name": req.body.first_name,
        "last_name": req.body.last_name,
        "password": req.body.password,
        "username": req.body.username        
    };
    if(validateThree(req)&&validateTwo(req)&&validateOne(req)&&(JSON.stringify(req.body) == JSON.stringify(Objbg))){ //Check the validations
    let u = await User.findOne({where:{id:id}})
    if(!u){res.status(403).send("Forbidden");} //Check if the ID exists or not
    else {

        if(req.get('Authorization')){
            const credentials = Buffer.from(req.get('Authorization').split(' ')[1], 'base64').toString().split(':')
            const username = credentials[0];
            const password = credentials[1];  //Check the authentication

            if(u.username == username && username == req.body.username){

    bcrypt.compare(password, u.password, (err, result) => {

        if(result){
    //if(u.first_name == req.body.first_name || u.last_name == req.body.last_name)

    bcrypt.hash(req.body.password, 10).then(hash => { 

        User.findOne({where:{id:id}}).then((sanju)=>{
            if(sanju.first_name==req.body.first_name && sanju.last_name==req.body.last_name && sanju.password==password){

                req.status(203).send("No Update necessary");
            }

            else{

    info ={
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password: hash,
        account_updated: date.toISOString()
    }
    const user = User.update(info, {where: {id: id}} )
    res.status(204).send()}
    })

})


}
    else{res.status(401).send("Unauthorized")}
})
        }
        else{res.status(401).send("Unauthorized")}

}

else{res.status(401).send("Unauthorized")}

}}

    else{res.status(400).send("Bad Request");}

}

const validateOne = (req) => {
    const regex =  "^\\s*$";
    const re =  '^[A-Za-z ]+';
    if(!req.body.first_name.match(regex)&&!req.body.last_name.match(regex)&&!req.body.password.match(regex) &&
    req.body.first_name.match(re) && req.body.last_name.match(re)) {
        
        return true
    }
    return false
}
// Function to check if the required fields is present or not in the payload 
const validateTwo = (req) => {
    const regex =  "^\\s*$";
    if(!(req.body.username===undefined) && !(req.body.password===undefined )&&!(req.body.first_name===undefined) &&!(req.body.last_name===undefined)) {

        return true
    }
    return false
}
// Function to check if the entered email is in the right format or not
const validateThree = (req) => {
    const regex =  "^\\s*$";
    const emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/; 
    if(req.body.username?.match(emailFormat)) {
        return true
    }
    return false
}

module.exports = {
    addUsers,
    getAllUsers,
    getUser,
    updateUsers
}
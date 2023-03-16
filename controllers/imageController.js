require('dotenv/config')
const db = require('../models');
const AWS = require('aws-sdk');
const uuid = require('uuid');
const multer = require('multer');
const storage = multer.memoryStorage({
  destination: function(req, file, callback) {
      callback(null, '');
  }
});

const User = db.stud;
const Product = db.product;
const Image = db.image;

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 1024 * 1024 * 5 }, // 5 MB file size limit

});

const bcrypt = require("bcrypt");  

const s3 = new AWS.S3({
  accessKeyId : "AKIA3DSMITPOHNG76FPS",
  secretAccessKey : "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"
});

const getImage = async (req, res) => {

  if(req.get('Authorization')){      //Checking if Basic Authorization is enabled or not
    const credentials = Buffer.from(req.get('Authorization').split(' ')[1], 'base64').toString().split(':')
    const username = credentials[0]
    const password = credentials[1]
    User.findOne({where:{username:username}}).then((r)=>{     //Checking if the username entered exits or not
      if(r){
      bcrypt.compare(password, r.password, (err, result) => {   //Checking if the Password entered is matching or not
          if(result){
            const product_id = req.params.id
            if(req.params.id>0){
            Product.findOne({where:{id:product_id, owner_user_id:r.id}}).then((imao) => {  //Checking if the User owns the product or not

              if(imao){
             Image.findAll({where:{product_id:product_id}}).then((images)=>{
              if(images){
                res.status(200).send(images);
              }else {res.status(403).send("Forbidden")} //Forbidden if the image is not under product
             })
              }
              else {res.status(404).send("Not Found")} //Product does not exist

            })}else {res.status(403).send("Forbidden")} //Forbidden is ID is non number
            
          } else {res.status(401).send("Unauthorized");}
      })
    } else {res.status(401).send("Unauthorized");}
  })
} else {res.status(401).send("  Unauthorized");}
}

const addImage = async (req, res) => {
  const date = new Date(); 


  if(req.get('Authorization')){      //Checking if Basic Authorization is enabled or not
    const credentials = Buffer.from(req.get('Authorization').split(' ')[1], 'base64').toString().split(':')
    const username = credentials[0]
    const password = credentials[1]
    User.findOne({where:{username:username}}).then((r)=>{     //Checking if the username entered exits or not
      if(r){
      bcrypt.compare(password, r.password, (err, result) => {   //Checking if the Password entered is matching or not
          if(result){
            const product_id = req.params.id
            if(product_id>0){
            Product.findOne({where:{id:product_id, owner_user_id:r.id}}).then((imao) => {  //Checking if the User owns the product or not
              if(imao){ 
                if (!req.file) {
                 res.status(400).send("Bad Request") //If no image is found
                }
                else {
                  if(isImage(req.file)){
                console.log(req.file.mimetype);
                let myFile = req.file.originalname.split(".");
                const fileType = myFile[myFile.length - 1];
              
                const params = {
                  Bucket: "demo-tf-s3-ruthwik",
                  Key: uuid.v4() + "." + fileType,
                  Body: req.file.buffer
                };
              
                s3.upload(params, (error, data) => {
                  if (error) {
                      res.status(500).send(error);
                  }               

                let info = {
                  product_id: product_id,
                  file_name: req.file.originalname,
                  date_created: date.toISOString(),
                  s3_bucket_path: data.Location
                }
              
                Image.create(info).then((image) => {
                  res.status(201).send(image)
                }) }); }else{ res.status(400).send("Bad Request")}  //If the image is not created
              }
              } else {res.status(404).send("Not Found")}
              
            })} else {res.status(403).send("Forbidden")}
          } else {res.status(401).send("Unauthorized")}
        })} else {res.status(401).send("Unauthorized")}
      })} else {res.status(403).send("Unauthorized")} 
}

const getImagebyID = async (req, res) => {
  if(req.get('Authorization')){      //Checking if Basic Authorization is enabled or not
    const credentials = Buffer.from(req.get('Authorization').split(' ')[1], 'base64').toString().split(':')
    const username = credentials[0]
    const password = credentials[1]
    User.findOne({where:{username:username}}).then((r)=>{     //Checking if the username entered exits or not
      if(r){
      bcrypt.compare(password, r.password, (err, result) => {   //Checking if the Password entered is matching or not
          if(result){
            const product_id = req.params.id
            const image_id = req.params.image_id
            if(product_id>0 && image_id>0){
            Product.findOne({where:{id:product_id, owner_user_id:r.id}}).then((pro)=>{ //Checking if the User has the Product
              if(pro){
            Image.findOne({where:{image_id:image_id, product_id:product_id}}).then((users)=>{ //Checking if the Product has the Image
              if(users){
              res.status(200).send(users)}
              else{res.status(403).send("Forbidden")}
            })} else {res.status(403).send("Forbidden")}  
          })
          }else {res.status(403).send("Forbidden")} 
          } else {res.status(401).send("Unauthorized")}
        })
      } else {res.status(401).send("Unauthorized")}
    })
  } else {res.status(403).send("Unauthorized")} 

}

const deleteImage = async (req, res) => {

  if(req.get('Authorization')){      //Checking if Basic Authorization is enabled or not
    const credentials = Buffer.from(req.get('Authorization').split(' ')[1], 'base64').toString().split(':')
    const username = credentials[0]
    const password = credentials[1]
    User.findOne({where:{username:username}}).then((r)=>{     //Checking if the username entered exits or not
      if(r){
      bcrypt.compare(password, r.password, (err, result) => {   //Checking if the Password entered is matching or not
          if(result){
            const product_id = req.params.id
            const image_id = req.params.image_id
            if(product_id>0 && image_id>0){
            Product.findOne({where:{id:product_id, owner_user_id:r.id}}).then((pro)=>{ //Checking if the User has the Product
              if(pro){
              Image.findOne({where:{product_id:product_id, image_id:image_id}}).then((one)=>{
                if(one){
                
                const deleteFile = (filePath) => {
                  
                  const params = {
                    Bucket: "demo-tf-s3-ruthwik",
                    Key: filePath.split('/')[3]
                  };
                  
                  s3.deleteObject(params, (err, data) => {
                    if (err) {
                      console.log(err);
                    } else {
                      console.log(`File ${filePath} deleted successfully`);
                    }
                  });
                };
                deleteFile(one.s3_bucket_path);
                Image.destroy({where:{product_id:product_id, image_id:image_id}}).then((del)=>{  // Delete the image if the id and the user id matches
                  if(del){
                     
                      res.status(204).send();}
                  else{
                      res.status(403).send("Forbidden");}
              }) } else {res.status(401).send("Not Found")} 
            
            })
       } else {res.status(401).send("Not Found")}  
          })
          }else {res.status(403).send("Forbidden")} 
          } else {res.status(401).send("Unauthorized")}
        })
      } else {res.status(401).send("Unauthorized")}
    })
  } else {res.status(401).send("Unauthorized")} 
}

function isImage(file) {

  if (file.mimetype=='image/jpg' || file.mimetype == 'image/jpeg'|| file.mimetype=='image/png') {
   
    return true;
  }
  else{ 
    return false;}
}

module.exports = {
  getImage,
  addImage,
  getImagebyID, 
  deleteImage,
  upload, 
}

const multer = require("multer");
const path = require("path");

const imageStorage = multer.diskStorage({
  destination: function(request, file, cb){
    let folder = ""
    if(request.baseUrl.includes("users")){
      folder = "users"
    }else if(request.baseUrl.includes("cars")){
      folder = "cars"
    }
    cb(null, `public/images/${folder}`)
  },
  filename: function (request, file, cb){
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

const imageUpload = multer({
  storage: imageStorage,
  fileFilter(request, file, cb){
    if(!file.originalname.match(/\.(png|jpg)$/)){
      return cb(new Error("Por favor, envie apenas jpg ou png"))
    }
    cb(undefined,true)
  }
})


module.exports = imageUpload
const cloudinary = require('cloudinary');

const {
    API_CLOUDINARY_KEY,
    API_CLOUDINARY_SECRET,
    API_CLOUDINARY_CLOUDNAME
     } = process.env


cloudinary.config({
    cloud_name: API_CLOUDINARY_CLOUDNAME,
    api_key: API_CLOUDINARY_KEY,
    api_secret: API_CLOUDINARY_SECRET
  });


 async function postImage(file,id){
    
    try {
       const result = await cloudinary.uploader.upload(file, { public_id: `public${id}` }, async function(error, result) {
            if (error) {
                console.log(error)
              return error
            } else {
              return result
              // Manejar la respuesta de Cloudinary después de la carga exitosa
            }
          });
           return result.url
    } catch (error) {
            return error.message;       
    }

}


module.exports = {
    postImage
}
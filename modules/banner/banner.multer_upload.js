const multer = require("multer");
var path = require('path');
const ApiError = require("../../utils/apiError");

const multerStorage = multer.diskStorage({
	destination: (req, file, cb) => {
        if(file.fieldname=="img_d"){
            cb(null, "public/images/banners/desktop");
        }else if(file.fieldname=="img_m"){
            cb(null, "public/images/banners/mobile");
        }
	},
	filename: (req, file, cb) => {
		cb(null, `banner-${file.fieldname}-${Date.now()}.${file.originalname}`);
	},
});

const multerFilter = (req, file, cb)=>{
    // Allowed ext
    const filetypes = /jpeg|png/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
  
    if(mimetype && extname){
      return cb(null, true);
    } else {
    return cb("Please upload image file of type jpeg or png.", false);
    }
}

const upload = multer({
	fileFilter: multerFilter,
	storage: multerStorage,
})

module.exports = upload;

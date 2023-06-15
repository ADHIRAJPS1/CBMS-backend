const upload = require('../banner.multer_upload');
const auth = require("../../../middlewares/auth_admin");

module.exports = (app) => {
    let router = require('express').Router();
    let {getAllBanners, getBannerById, createBanner, updateBanner , deleteBanner} = require("../controller/banner.controller");

    router.get('/:id', getBannerById);
    router.get('/', getAllBanners);

    router.post("/", auth , upload.fields([
        {
            name:'img_d',
            maxCount:1
        },{
            name:'img_m',
            maxCount:1
        }
    ]), createBanner);

    router.patch("/:id", auth , upload.fields([
        {
            name:'img_d',
            maxCount:1
        },{
            name:'img_m',
            maxCount:1
        }
    ]), updateBanner);

    router.patch("/delete/:id", auth , deleteBanner);

    app.use("/api/v1/banner", router);
};

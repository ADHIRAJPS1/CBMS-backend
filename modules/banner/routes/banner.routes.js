const upload = require('../banner.multer_upload');

module.exports = (app) => {
    let router = require('express').Router();
    let {getAllBanners, getBannerById, createBanner, updateBanner} = require("../controller/banner.controller");

    router.get('/:id', getBannerById);
    router.get('/', getAllBanners);

    router.post("/", upload.fields([
        {
            name:'img_d',
            maxCount:1
        },{
            name:'img_m',
            maxCount:1
        }
    ]), createBanner);

    router.patch("/:id", upload.fields([
        {
            name:'img_d',
            maxCount:1
        },{
            name:'img_m',
            maxCount:1
        }
    ]), updateBanner);

    app.use("/api/v1/banner", router);
};

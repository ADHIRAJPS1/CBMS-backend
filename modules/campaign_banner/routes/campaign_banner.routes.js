const auth = require("../../../middlewares/auth_admin");

module.exports = (app)=>{
    const router = require('express').Router();
    const campaign_banner = require('../controller/campaign_banner.controller');

    router.post("/",  campaign_banner.create);
    router.patch("/:id",  campaign_banner.update);

    // get all banners with details of a particular campaign_id and details of each banner
    router.get("/:cid", campaign_banner.getAllBanners);      
    
    router.patch("/delete/:id", auth , campaign_banner.deleteCampaignBanner);
    // router.get("/:cid/:bid", campaign_banner.getBannerdata);
    
    app.use("/api/v1/campaign_banner", router);
}
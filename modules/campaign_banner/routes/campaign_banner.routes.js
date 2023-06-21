const auth = require("../../../middlewares/auth_admin");

module.exports = (app)=>{
    const router = require('express').Router();
    const campaign_banner = require('../controller/campaign_banner.controller');

    router.post("/",  campaign_banner.create);

    // update campaign banner with unique id of campaignbanner
    router.patch("/:id",  campaign_banner.update);

    // get all banners with details of a particular campaign_id and details of each banner
    router.get("/:cid", campaign_banner.getAllBanners);      
    
    router.patch("/delete/:id", campaign_banner.deleteCampaignBanner);

    // get details of one campaign in a banner
    router.get("/:cid/:bid", campaign_banner.getBannerdata);
    
    // update a campaign banner 
    // router.patch("/:cid/:bid", campaign_banner.updateBanner);
    
    app.use("/api/v1/campaign_banner", router);
}
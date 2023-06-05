const auth = require("../../../middlewares/auth_admin");

module.exports = (app)=>{
    const router = require('express').Router();
    const campaign_banner = require('../controller/campaign_banner.controller');

    router.post("/", auth , campaign_banner.create);
    router.patch("/:id",auth ,  campaign_banner.update);

    router.get("/:cid", campaign_banner.getAllBanners);      
    router.patch("/delete/:id", auth , campaign_banner.deleteCampaignBanner)
    
    app.use("/api/v1/campaign_banner", router);
}
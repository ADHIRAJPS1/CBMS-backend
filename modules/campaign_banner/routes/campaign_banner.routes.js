
module.exports = (app)=>{
    const router = require('express').Router();
    const campaign_banner = require('../controller/campaign_banner.controller');

    router.post("/", campaign_banner.create);
    router.patch("/:id", campaign_banner.update);

    app.use("/api/v1/campaign_banner", router);
}
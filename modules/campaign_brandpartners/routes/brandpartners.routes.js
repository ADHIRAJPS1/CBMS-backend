const auth = require("../../../middlewares/auth_admin");

module.exports = (app)=>{
    const router = require('express').Router();
    const brandpartners = require("../controller/brandpartners.controller");
    

    // fetch all quicklinks of a campaign
    router.get('/:campid', brandpartners.getAllBrandPartnersOfCampaign );
    
    // create quicklinks 
    router.post('/', brandpartners.createBrandPartners);

    // router.patch('/:qlid', brandpartners.updateQuicklinks);

    // router.patch('/delete/:qlid', brandpartners.deleteQuicklinks);

    app.use("/api/v1/campaign_brandpartners", router);
}
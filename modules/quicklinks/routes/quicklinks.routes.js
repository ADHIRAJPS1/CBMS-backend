const auth = require("../../../middlewares/auth_admin");

module.exports = (app)=>{
    const router = require('express').Router();
    const quicklinks = require("../controller/quicklinks.controller");
    

    // fetch all quicklinks of a campaign
    router.get('/:campid', quicklinks.getAllQuicklinksOfCampaign );
    
    // create quicklinks 
    router.post('/', quicklinks.createQuicklinks);

    router.patch('/:qlid', quicklinks.updateQuicklinks);

    router.patch('/delete/:qlid', quicklinks.deleteQuicklinks);

    app.use("/api/v1/campaign_quicklinks", router);
}
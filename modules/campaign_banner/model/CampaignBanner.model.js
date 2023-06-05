const { Model } = require("objection");

class CampaignBanner extends Model{
    static get tableName(){
        return "campaign_banner";
    }

    $beforeInsert(){
        this.created_at = new Date();
        this.modified_at = new Date();
    }

    $beforeUpdate(){
        this.modified_at = new Date();
    }
}

module.exports = CampaignBanner;
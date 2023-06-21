const { Model } = require("objection");

class BrandPartners extends Model{
    static get tableName(){
        return "brandpartners";
    }

    $beforeInsert(){
        this.created_at = new Date();
        this.modified_at = new Date();
    }

    $beforeUpdate(){
        this.modified_at = new Date();
    }
}
module.exports = BrandPartners;
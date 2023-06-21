const { Model } = require("objection");

class QuickLinks extends Model{
    static get tableName(){
        return "quicklinks";
    }

    $beforeInsert(){
        this.created_at = new Date();
        this.modified_at = new Date();
    }

    $beforeUpdate(){
        this.modified_at = new Date();
    }
}
module.exports = QuickLinks;
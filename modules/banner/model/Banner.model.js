const {Model} = require("objection");

class Banner extends Model{
    static get tableName(){
        return "banners";
    }

    $beforeInsert(){
        this.created_at = new Date();
        this.modified_at = new Date();
    }

    $beforeUpdate(){
        this.modified_at = new Date();
    }
}

module.exports = Banner;
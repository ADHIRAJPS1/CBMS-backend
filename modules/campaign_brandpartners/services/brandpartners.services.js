const ApiError = require("../../../utils/apiError");
const BrandPartners = require("../model/brandpartners.model");


class BrandPartnersService {
    async create(data) {
        try{
            console.log("db = ",data);
            const brandpartners = await BrandPartners.query().findOne({ title:data.title ,is_deleted: 0});
            console.log(" service brandparttners = ",brandpartners);
            if(!(brandpartners > 0) || (brandpartners === undefined)) {
                const brandpartnerscreated = await BrandPartners.query().insert({
                    "title": data.title,
                    "href": data.href,
                    "campaign_id": data.campaign_id,
                    "client_id": data.client_id,
                    // "is_deleted": data.is_deleted,
                    // "created_by": data.created_by,
                    // "modified_by": data.modified_by
                });   
                console.log("created = ",brandpartnerscreated);
                return brandpartnerscreated;   
            }
           
        } catch (err) {
            console.log("qc err = ", err);
            throw err;
        }
    }

    async getAllBrandPartnersOfBanner(id) {
        try{
            let campbannerid = id;
            console.log(" cbid = ", campbannerid);
            const data = await BrandPartners.query()
                .where('campaign_id',campbannerid)
                .select('*');
            // console.log("dl = ", data);
            // console.log(" QL data = ",data);
            return data;
        } catch (err) {
            console.log(err);
            throw err;
        }
    };

    // async updateQuickLinksOfBanner(id , data){
    //     try{
    //         let qlid = id;
    //         const found = await QuickLinks.query().findOne({id:qlid});
    //         console.log(found);
    //         if(found){
    //             let updated = await QuickLinks.query().patchAndFetchById(qlid,data);
    //             console.log("updated ",updated);
    //             return updated;
    //         }

    //     } catch(err) {
    //         throw err;
    //     }
    // }

    // async deleteQuickLinksOfBanner(id){
    //     try{
    //         const qlid = id;
    //         const found = await QuickLinks.query().findOne({id:qlid});
    //         if(found){
    //             let deleted = await QuickLinks.query().where('id',qlid).update({is_deleted: 1});
    //             console.log("deleted",deleted);
    //             return deleted;
    //         }
    //     } catch(err) {
    //         return err;
    //     }
    // };
};

module.exports = new BrandPartnersService();

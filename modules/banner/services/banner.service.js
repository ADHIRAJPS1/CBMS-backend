const ApiError = require("../../../utils/apiError");
const Banner = require("../model/Banner.model");
const { v4: uuidv4 } = require("uuid");

class BannerService {
    async getAllBanners(data){
        try {
            const banners = await Banner.query().select("id","title","img_d","img_m","modified_at").where({is_deleted:0});
            if(banners.length==0) throw ApiError.notFound("Banners not found.");
            return banners;            
        } catch (err) {
            throw err;
        }
    }

    async getBannerById(id){
        try {
            const banner = await Banner.query().select("id","title","img_d","img_m","modified_at").where({id:id, is_deleted:0});
            if(banner.length==0) throw ApiError.notFound(`Banner id ${id} not found.`);
            return banner;            
        } catch (err) {
            throw err;
        }
    }

    async createBanner(data) {
        try {

            const titleExist = await Banner.query().findOne({title: data.title, is_deleted: 0});
            if(titleExist) throw ApiError.alreadyExists("Banner title already exist.");

            const newBanner = await Banner.query().insert({
                id: uuidv4(),
                title: data.title,
                img_d: data.img_d,
                img_m: data.img_m,
            });
    
            return newBanner;
        } catch (err) {
            throw err;
        }
    }

    async updateBanner(id, data) {
        try {
            const bannerExist = await Banner.query().findOne({id:id, is_deleted:0});
            if (!bannerExist) throw ApiError.notFound(`Banner id ${id} not found`);
            for (let key in data){
                if(!data[key]) delete data[key];
            }
            const updatedBanner = await Banner.query().patchAndFetchById(id, data);
        
            return updatedBanner;
          } catch (err) {
            throw err
          }
    }
}

module.exports = new BannerService();
const ApiError = require("../../../utils/apiError");
const ClientCampaign = require("../../assign_campaign/models/client_org_campaigns.model");
const Banner = require("../../banner/model/Banner.model");
const CampaignBanner = require("../model/CampaignBanner.model");
const { v4: uuidv4 } = require("uuid");

class CampaignBannerService {
    async create(data) {
        try {
            const campaign = await ClientCampaign.query().findOne({ campaign_id: data.campaign_id, is_deleted: 0 });
            if (!campaign) throw ApiError.notFound("Campaign not found");
            const banner = await Banner.query().findOne({ id: data.banner_id, is_deleted: 0 });
            if (!banner) throw ApiError.notFound("Banner not found");
            const campaign_banner = await CampaignBanner.query().findOne({ campaign_id: data.campaign_id, banner_id: data.banner_id, is_deleted: 0 });
            if (campaign_banner) throw ApiError.notFound("Campaign already have this banner!");


            const new_campaign_banner = await CampaignBanner.query().insert({
                id: uuidv4(),
                campaign_id: data.campaign_id,
                banner_id: data.banner_id,
                alt: data.alt ? data.alt : null,
                href: data.href ? data.href : null,
                sequence_no: data.sequence_no ? data.sequence_no : null
            });

            return new_campaign_banner;

        } catch (err) {
            throw err;
        }
    }

    async update(id, data) {
        try {
            const campaign_banner = await CampaignBanner.query().findOne({ id: id, is_deleted: 0 });
            if (!campaign_banner) throw ApiError.notFound("Campaign banner does not exist!");
            for (let key in data) {
                if (!data[key]) delete data[key];
            }
            const updated_campaign_banner = await CampaignBanner.query().patchAndFetchById(id, data);

            return updated_campaign_banner;

        } catch (err) {
            throw err;
        }
    }

    // get all campaign banners for single campaign by id
    async getCampaignBanners(id) {
        try {
            const campaignbanners = await CampaignBanner.knex()
                .raw(`SELECT campaign_banner.id,campaign_banner.campaign_id,campaign_banner.banner_id, campaign_banner.alt , campaign_banner.href , campaign_banner.sequence_no,campaign_banner.modified_at, campaign_banner.created_at,  banners.title , banners.img_d , banners.img_m FROM campaign_banner join banners where (banners.id = campaign_banner.banner_id) and (campaign_banner.campaign_id = ${id}) ;`);
            return campaignbanners[0];
        } catch (err) {
            throw err;
        }
    }

    async updateCampaignsWithBannerId(id) {
        try {
            console.log(id);
            const updatedstatus = await CampaignBanner.query().where('banner_id', id).update({is_deleted: 1});
            if(updatedstatus.length > 0) {
                return "UPDATED SUCCESSFULLY";
            }
        } catch(err) {
            throw err;
        }
    }

    async deleteOneCampaignWithBannerId(id) {
        try{
            const found  = await CampaignBanner.query().findById(id);
            if(found){
                const deletedstatus = await CampaignBanner.query().where('id', id).update({is_deleted: 1});
                if(deletedstatus > 0){
                    return "DELETED SUCCESSFULLY";
                    
                }
            }
            
        }catch(err) {
            throw err;
        }
    }

    async getCampaignWithId(campaignId,bannerId) {
        try{
            const bannerdata = (await CampaignBanner.query()).find({'campaign_id':campaignId, 'banner_id':bannerId});
            return bannerdata;
        } catch(err) {
            throw err;
        }

    }

}

module.exports = new CampaignBannerService();
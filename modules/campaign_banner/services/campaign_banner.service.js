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
            for (let key in data){
                if(!data[key]) delete data[key];
            }
            const updated_campaign_banner = await CampaignBanner.query().patchAndFetchById(id, data);

            return updated_campaign_banner;

        } catch (err) {
            throw err;
        }
    }

}

module.exports = new CampaignBannerService();
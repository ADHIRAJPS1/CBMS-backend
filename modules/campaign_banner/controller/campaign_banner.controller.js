const ApiError = require("../../../utils/apiError")
const Response = require("../../../utils/response");
const CampaignBannerService = require("../services/campaign_banner.service");

const create = async (req, res)=>{
    try {
        const data = req.body;
        if(!data || !data?.campaign_id || !data?.banner_id) return Response.error(res, ApiError.badRequest("Fill required details."));
        
        const new_campaign_banner = await CampaignBannerService.create(data);
        return Response.success(res, {
            msg: "Campaign Banner",
            data: new_campaign_banner
        });
    } catch (err) {
        if(err instanceof ApiError) return Response.error(res, err);
        return Response.error(res, ApiError.internal(err));
    }
}

const update = async (req, res)=>{
    try {
        const id = req.params.id;
        const data = req.body;
        if(!id || !data) return Response.error(res, ApiError.badRequest("Please fill details."));
        
        const updatedCampaignBanner = await CampaignBannerService.update(id, data);
        return Response.success(res, {
            msg: "Campaign Banner updated successfully!",
            data: updatedCampaignBanner
        });
    } catch (err) {
        if(err instanceof ApiError) return Response.error(res, err);
        return Response.error(res, ApiError.internal(err));
    }
}

module.exports={
    create,
    update
}
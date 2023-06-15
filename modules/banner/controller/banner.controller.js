const ApiError = require("../../../utils/apiError");
const Response = require("../../../utils/response");
const { modifyPath } = require("../../../utils/utilities");
const BannerService = require("../services/banner.service");
const CampaignBannerService = require("../../campaign_banner/services/campaign_banner.service");


const getAllBanners = async (req, res) => {
    try {
        const response = await BannerService.getAllBanners();
        return Response.success(res, {
            msg: `All Banners!`,
            data: response
        });
    } catch (err) {
        if (err instanceof ApiError) {
            return Response.error(res, err);
        }
        return Response.error(res, ApiError.internal(res, err));
    }
}

const getBannerById = async (req, res) => {
    try {
        const response = await BannerService.getBannerById(req.params.id);
        return Response.success(res, {
            msg: `Banner found.`,
            data: response
        });
    } catch (err) {
        if (err instanceof ApiError) {
            return Response.error(res, err);
        }
        return Response.error(res, ApiError.internal(res, err));
    }
}

const createBanner = async (req, res) => {
    try {
        const title = req.body.title?.trim();
        const files_data = req.files;
        if (!title) return Response.error(res, ApiError.badRequest("Select title of banner."));
        if (!files_data) return Response.error(res, ApiError.badRequest("Select banner image."));
        if (!files_data.img_d && !files_data.img_m) return Response.error(res, ApiError.badRequest("Select banner image."));
        const data = {
            title,
            img_d: files_data.img_d ? modifyPath(files_data.img_d[0].path) : null,
            img_m: files_data.img_m ? modifyPath(files_data.img_m[0].path) : null
        }
        const banner = await BannerService.createBanner(data);

        return Response.success(res, {
            msg: "Banner uploaded successfully",
            data: banner
        });
    } catch (err) {
        if (err instanceof ApiError) return Response.error(res, err);
        return Response.error(res, ApiError.internal(err));
    }
}

const updateBanner = async (req, res) => {
    try {
        const files_data = req.files;
        if (!files_data) return Response.error(res, ApiError.badRequest("Select banner image."));
        if (!files_data.img_d && !files_data.img_m) return Response.error(res, ApiError.badRequest("Select banner image."));
        if (req.files) {
            if (req.files["img_d"] !== undefined) {
                const img_d_path = modifyPath(req.files["img_d"][0].path);
                req.body.img_d = img_d_path;
            } else {
                delete req.body["img_d"];
            }

            if (req.files["img_m"] !== undefined) {
                const img_m_path = modifyPath(req.files["img_m"][0].path);
                req.body.img_m = img_m_path;
            } else {
                delete req.body["img_m"];
            }
        }

        const response = await BannerService.updateBanner(req.params.id, req.body);
        return Response.success(res, {
            msg: "Banner updated successfully",
            data: response
        });
    } catch (err) {
        if (err instanceof ApiError) return Response.error(res, err);
        return Response.error(res, ApiError.internal(err));
    }
};

const deleteBanner = async (req, res) => {
    try {
        let id = req.params.id;
        const response = await BannerService.deleteBanner(req.params.id);
        const update_campaigns = await CampaignBannerService.updateCampaignsWithBannerId(id);
        if(response.length > 0 && update_campaigns.length > 0) 
            res.send({
                data: "Deleted Successfully AND CAMPAIGNS GOT UPDATED",
                msg: response
        });
        else(response.length > 0) 
            res.send({
                data: "Deleted Successfully",
                msg: response
        });
    } catch (err) {
        if (err instanceof ApiError) return Response.error(res, err);
        return Response.error(res, ApiError.internal(err));
    }
}

module.exports = {
    getAllBanners,
    getBannerById,
    createBanner,
    updateBanner,
    deleteBanner
}
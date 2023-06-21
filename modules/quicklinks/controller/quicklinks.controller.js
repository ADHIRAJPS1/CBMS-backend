const ApiError = require("../../../utils/apiError")
const Response = require("../../../utils/response");
const quicklinksService = require("../services/quicklinks.service");
const QuickLinkService = require("../services/quicklinks.service");

const getAllQuicklinksOfCampaign = async (req, res) => {
    try {
        const campid = req.params.campid;
        console.log("camp id = ", campid);
        const quicklinkdetails = await QuickLinkService.getAllQuickLinksOfBanner(campid);
        if (quicklinkdetails) {
            res.send({
                msg: "Matched FOund",
                data: quicklinkdetails
            });
        }
        else {
            res.send({
                msg: "NOT FOUND",
                data: quicklinkdetails
            });
        }

    } catch (err) {
        // throw new ApiError(500,"Internal Server Error", err);
        if (err instanceof ApiError) {
            return Response.error(res, err);
        }
        return Response.error(res, ApiError.internal(res, err));
    }
};


const createQuicklinks = async (req, res) => {
    try {
        let data = req.body;
        const created = await quicklinksService.create(data);
        if(created.length > 0){
            res.send(created);
        }
        else{
            res.send("NOT FOUND")
        }

    } catch (err) {
        if (err instanceof ApiError) {
            return Response.error(res, err);
        }
        return Response.error(res, ApiError.internal(res, err));
    }
};

const updateQuicklinks = async (req, res) => {
    try {
        let qlid = req.params.qlid;
        let data = req.body;
        // console.log(" updated qlinks ", qlid , data);
        const updated = await quicklinksService.updateQuickLinksOfBanner(qlid, data);
        res.send({ "data": updated })
    } catch (err) {
        if (err instanceof ApiError) {
            return Response.error(res, err);
        }
        return Response.error(res, ApiError.internal(res, err));
    }
};

const deleteQuicklinks = async (req, res) => {
    try {
        let qlid = req.params.qlid;
        const deleted = await quicklinksService.deleteQuickLinksOfBanner(qlid);
        if (deleted) res.send({ "msg": "Deleted Successfully" });
    } catch (err) {
        if (err instanceof ApiError) {
            return Response.error(res, err);
        }
        return Response.error(res, ApiError.internal(res, err));
    }
}

module.exports = {
    getAllQuicklinksOfCampaign,
    createQuicklinks,
    updateQuicklinks,
    deleteQuicklinks
};


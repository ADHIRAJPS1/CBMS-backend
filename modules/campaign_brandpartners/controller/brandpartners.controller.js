const ApiError = require("../../../utils/apiError");
const Response = require("../../../utils/response");
const BrandPartnersService = require("../services/brandpartners.services");

const getAllBrandPartnersOfCampaign = async (req, res) => {
    try{
        const campid = req.params.campid;
        console.log("camp id = ", campid);
        const brandpartners = await BrandPartnersService.getAllBrandPartnersOfBanner(campid);
        console.log("length = ", brandpartners.length);
        if (brandpartners.length > 0) {
            res.send({
                msg: "Matched FOund",
                data: brandpartners
            });
        }
        else{
            res.send({
                msg: "NOT FOUND",
                data: quicklinkdetails
            });
        }
    } catch (err) {
        if (err instanceof ApiError) {
            return Response.error(res, err);
        }
        return Response.error(res, ApiError.internal(res, err));
    }
};

const createBrandPartners = async (req, res) => {
    try{
        let data = req.body;
        // console.log("dbp = ",data);
        const created = await BrandPartnersService.create(data);
        console.log("cr = ",created);
        if(created !== null || created !== undefined){
            res.send("BRANDPARTNERS CREATED SUCCESSFULLY");
        }
    } catch(err) {
        if (err instanceof ApiError) {
            return Response.error(res, err);
        }
        return Response.error(res, ApiError.internal(res, err));
    }
}

module.exports = {
    getAllBrandPartnersOfCampaign,
    createBrandPartners
}
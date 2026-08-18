const constants=require("../constants")

const errorHandling = (err,req,res,next) =>{
    const statuscode= res.statuscode ? res.statuscode : 500;
    switch (statuscode) {
        case constants.validationerror:
            res.json({
                title:"validation failed",
                mesage:err.message,
            stackTrack:err.stack})
            break;
    
        case constants.not_found:
            res.json({
                title:"not found",
                mesage:err.message,
            stackTrack:err.stack});
            break;
        case constants.server_error :
        res.json({
                title:"server_error",
                mesage:err.message,
            stackTrack:err.stack});
            break;
        case constants.forbidden:
        res.json({
                title:"forebidden",
                mesage:err.message,
            stackTrack:err.stack});
            break;
        case constants.unauthorized:
            res.json({
                title:"unauthorized",
                mesage:err.message,
            stackTrack:err.stack});
            break;
        default:
            break;
    }
}

module.exports=errorHandling;
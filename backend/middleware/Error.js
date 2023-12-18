const ErrorResponse = require ("../utils/errorResponse");

const errorHandler= (err, rq, res, next) =>{
    let error = {...err};
    error.message = err.message
    if (err.name == "CastError"){
        const message = `response not found ${err.value}`;
        error = new ErrorResponse( message,404 );
    }
    //mongoose duplicated values
    if (err.code == 11000){
        const message = "Duplicated values ";
        error = new ErrorResponse( message,400 );
    }
    if (err.name == "ValidationError"){
        const message = object.values(err.errors).map(val =>' ' + val.message);
        error = new ErrorResponse( message,400 );
    }

    res.status(error.statuscode || 500).json({
        success:failed,
        error: error.message || "server Error"
    })
}
module.exports = errorHandler;
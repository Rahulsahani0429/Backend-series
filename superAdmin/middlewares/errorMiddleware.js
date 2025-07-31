export const errorHandler = (error, req,res, next) =>{
    console.log(error.message);
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    return res.status(statusCode).json({message:error.message, stack:process.env.MODE_ENV === "prodution" ? null : error.stack})

}
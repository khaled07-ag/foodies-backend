const notFoundHandler = async (req,res,next)=>{
    try {
        return res.status(404).json({error: `${req.originalUrl} does not exist`})
    } catch (error) {
        console.log(error)
        next(error)
        
    }
}
module.exports = notFoundHandler
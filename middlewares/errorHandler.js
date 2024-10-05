const errorHandler = async (error, req, res, next)=>{
    try {
        return res.status(error.status || 500).json({error: error || "Server went down"})
    } catch (error) {
        
        next(error)
    }
}
module.exports = errorHandler;
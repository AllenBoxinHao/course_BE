const NotFoundException = require("../../exceptions/notFoundException");

module.exports = (error, req, res, next) => {
    if (error instanceof NotFoundException) {
        res.status(404).json({ error: error.message });
        return;
    }
    next(error);
};

module.exports = (error, req, res, next) => {
    if (error.name === "ReferenceError") {
        res.status(400).json({ error: error.message });
        return;
    }
    next(error);
};

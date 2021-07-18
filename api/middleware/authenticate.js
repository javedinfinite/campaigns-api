module.exports = (req, res, next) => {
    try {
            //here write code for authenticating users.
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed',
            error: error
        });
    }
};
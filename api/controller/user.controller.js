const { getUserData } = require("../service/user.service")


exports.getUser = (req, res) => {
    const data = getUserData()
    return res.status(200).json({
        status: 'success',
        data,
        message: 'Successfully fetched document',
      });

}
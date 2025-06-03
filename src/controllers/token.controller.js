const service = require("../services/token.service");

exports.createTokenByUserAndDevice = async (req, res) => {
  const { userID } = req.params;
  const { token } = req.body;
  try {
    const newToken = await service.createTokenByUserAndDevice(userID, token);
    return res.status(201).json(newToken);
  } catch (error) {
    console.error("Error creating token:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

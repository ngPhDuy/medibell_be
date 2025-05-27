const { User } = require("../models");
const bcryptjs = require("bcryptjs");

exports.login = async (username, password) => {
  const user = await User.findOne({
    where: { ten_dang_nhap: `${username}` },
  });

  if (!user) {
    throw new Error("Tài khoản hoặc mật khẩu không đúng");
  }

  const match = await bcryptjs.compare(password, user.mat_khau);
  if (!match) {
    throw new Error("Tài khoản hoặc mật khẩu không đúng");
  }

  return {
    ten_dang_nhap: user.ten_dang_nhap,
    ho_va_ten: user.ho_va_ten,
    avt_url: user.avt_url,
    id: user.id,
  };
};

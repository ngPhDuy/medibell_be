const axios = require("axios");

exports.sendMedicineSchedule = async (token, body, retries = 3) => {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const response = await axios.post(
        "https://exp.host/--/api/v2/push/send",
        {
          to: token,
          sound: "default",
          title: "Nhắc nhở uống thuốc",
          body: JSON.stringify(body),
        },
        {
          headers: {
            Accept: "application/json",
            "Accept-Encoding": "gzip, deflate",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.data.status === "ok") {
        console.log(`✅ Gửi thành công cho token: ${token}`);
        return true; // thành công
      } else {
        throw new Error(response.data.data.message || "Unknown Expo error");
      }
    } catch (error) {
      console.error(
        `❌ Lỗi gửi lần ${attempt + 1} cho token: ${token}:`,
        error.message
      );

      if (attempt === retries - 1) {
        console.error(`⛔ Gửi thất bại sau ${retries} lần thử.`);
        return false; // thất bại
      }

      await wait(2000); // đợi 2s trước khi retry
    }
  }
};

// Hàm wait tạm thời
function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

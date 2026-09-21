import nodemailer from "nodemailer";

console.log("🚀 Mail config loaded");

const mailTransport = nodemailer.createTransport({
  service: "gmail", // ✅ simpler
  auth: {
    user: "akbasant99190@gmail.com",
    pass: "shjk jpvv lvmo qsse", // ✅ NOT normal password
  },
});

// 🔍 Verify
mailTransport.verify((error, success) => {
  if (error) {
    console.error("❌ Mail ERROR:", error);
  } else {
    console.log("✅ Mail server is READY");
  }
});

export default mailTransport;
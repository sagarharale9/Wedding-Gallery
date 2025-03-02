export default function handler(req, res) {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method Not Allowed" });
    }
  
    const { username, password } = req.body;
  
    // Hardcoded Admin Credentials (Change this in production)
    const ADMIN_USERNAME = "123";
    const ADMIN_PASSWORD = "0330";
  
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      res.status(200).json({ success: true });
    } else {
      res.status(401).json({ message: "Invalid Credentials" });
    }
  }
  

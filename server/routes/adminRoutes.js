import express from "express";
import EmailLog from "../models/EmailLog.js";

const router = express.Router();

// Check secret key in url 

// http://localhost:8080/admin/adminRoute/Adminpannel?key=yourAdminKey

router.get("/Adminpannel", async (req, res) => {
    try {
        if (req.query.key !== process.env.ADMIN_KEY) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // 1) Count total emails
        const totalEmail = await EmailLog.countDocuments();

        // 2) Recent requests (last 20)
        const recentRequests = await EmailLog.find()
            .sort({ timestamp: -1 })
            .limit(20);

        // 3) Count Legit + Suspicious
        let legitCount = await EmailLog.countDocuments({ isSuspicious: false });
        let suspiciousCount = await EmailLog.countDocuments({ isSuspicious: true });

        // 4) Count emails checked in last 24 hours
        const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000);
        const todayCount = await EmailLog.countDocuments({
            timestamp: { $gte: last24Hours }
        });

        // 5) Daily stats for Line Chart (last 7 days)
        const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

        const rawStats = await EmailLog.aggregate([
            { $match: { timestamp: { $gte: sevenDaysAgo } } },
            {
                $group: {
                    _id: {
                        $dateToString: { format: "%Y-%m-%d", date: "$timestamp" }
                    },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        // Convert chart data to readable format
        const dailyStats = rawStats.map(item => ({
            day: item._id,
            count: item.count
        }));

        // Send final response
        setTimeout(()=>{
            res.json({
            totalEmail,
            recentRequests,
            legitCount,
            suspiciousCount,
            todayCount,
            dailyStats
        });
        },2000);

    } catch (err) {
        console.error("Admin error:", err);
        res.status(500).json({ message: "Server error" });
    }
});



export default router;
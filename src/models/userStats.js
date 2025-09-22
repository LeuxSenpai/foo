import mongoose from "mongoose";

const userStatsSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    goals: { type: Number, default: 0 },
    manOfTheMatch: { type: Number, default: 0 },
    matchesPlayed: { type: Number, default: 0 },
    winRate: { type: Number, default: 0 },
    likeability: { type: Number, default: 0 },
    achievements: { type: [String], default: [] },
});

const UserStats = mongoose.models.UserStats || mongoose.model("UserStats", userStatsSchema);
export default UserStats;

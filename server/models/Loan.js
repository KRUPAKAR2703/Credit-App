import mongoose from "mongoose";

const LoanSchema = new mongoose.Schema(
  {
    name: String,
    amount: Number,
    address: String,
    employment_status: String,
    tenure: Number,
    reason: String,
    user_id: String,
    status:  {
      type: String,
      enum: ["pending", "verified", "approved","rejected"],
      default: "pending",
    }
  },
  { timestamps: true }
);

const Loan = mongoose.model("Loan", LoanSchema);
export default Loan;

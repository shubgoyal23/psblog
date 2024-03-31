import mongoose from "mongoose";

const verificationSchema = new mongoose.Schema(
   {
      userId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "users",
      },
      forgotPasswordToken: String,
      forgotPasswordTokenExpiry: Date,
      verifyToken: String,
      verifyTokenExpiry: Date,
   },
   {
      timestamps: true,
   }
);

const Verification =
   mongoose.models.verifications ||
   mongoose.model("verifications", verificationSchema);

export default Verification;

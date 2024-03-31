import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
   {
      firstName: String,
      lastName: String,
      email: {
         type: String,
         required: true,
         unique: true,
         lowercase: true,
         validate: {
            validator: function (v: string) {
               return /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/.test(
                  v
               );
            },
            message: (props: { value: string }) =>
               `${props.value} is not a valid email address!`,
         },
      },
      password: {
         type: String,
         required: true,
      },
      isVerfied: {
         type: Boolean,
         default: false,
      },
      accountType: {
         type: String,
         enum: ["User", "Subscriber", "Author", "Admin"],
         default: "User",
      },
      avatar: {
         type: String,
      },
      refreshToken: {
         type: String,
      },
   },
   {
      timestamps: true,
   }
);

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;

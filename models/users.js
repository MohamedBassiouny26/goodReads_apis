const mongoose = require("mongoose");
const booksModel = require('./books')
const bcrypt = require('bcrypt')
const UserSchema = new mongoose.Schema({
    photo: { type: String },
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    email: { type: String, required: true , unique : true },
    password: { type: String, required: true },
    library: [
        {
            bookId: { type: mongoose.Schema.Types.ObjectId, ref: "books", unique: true },
            status: { type: String, enum: ["read", "want to read", "currently reading"], required: true },
            rating: { type: Number },
            review: { type: String }
        }
    ]
})

// UserSchema.methods = {
//     createAccessToken: async function () {
//       try {
//         let { _id, username } = this;
//         let accessToken = jwt.sign(
//           { user: { _id, username } },
//           ACCESS_TOKEN_SECRET,
//           {
//             expiresIn: "10m",
//           }
//         );
//         return accessToken;
//       } catch (error) {
//         console.error(error);
//         return;
//       }
//     },
//     createRefreshToken: async function () {
//       try {
//         let { _id, username } = this;
//         let refreshToken = jwt.sign(
//           { user: { _id, username } },
//           REFRESH_TOKEN_SECRET,
//           {
//             expiresIn: "1d",
//           }
//         );
//   await new Token({ token: refreshToken }).save();
//         return refreshToken;
//       } catch (error) {
//         console.error(error);
//         return;
//       }
//     },
//   };
//   //pre save hook to hash password before saving user into the database:
// UserSchema.pre("save", async function (next) {
//     try {
//       let salt = await bcrypt.genSalt(12); // generate hash salt of 12 rounds
//       let hashedPassword = await bcrypt.hash(this.password, salt); // hash the current user's password
//       this.password = hashedPassword;
//     } catch (error) {
//       console.error(error);
//     }
//     return next();
//   });




const UserModel = mongoose.model("users", UserSchema)
module.exports = UserModel;
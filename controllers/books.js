// const bookModel = require('../models/books')

// async function saveBooks(req,res){
// const booksSchema = new mongoose.Schema({
//     author: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "author" },
//     cover: { type: String, required: true },
//     name: { type: String, required: true ,unique:true},
//     avgRate: { type: Number, },
//     sumary: { type: String , required:true},
//     categoryId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "categories" },
//     sumAvg: { type: Number },
//     countAvg: { type: Number },

//     reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }]

//   })

//   booksSchema.post('save', function (doc) {
//     categoriesModel.findByIdAndUpdate(doc.categoryId, { $push: { books: doc._id } }, (err, posts) => {
//       console.log("hello")
//     })
//   });

  
//   booksSchema.post('save', function (doc) {
//     AuthorModel.findByIdAndUpdate(doc.author, { $push: { books: doc._id } }, (err, posts) => {
//       console.log("hello2")
//     })
  
//   })};
  
//   async function FindAll(res , req){
//     const book = await bookModel.find({}).populate("author").populate("categoryId").exec();
//     try {
//         res.json(book)
//     }
//     catch (err) {
//         console.log(err)
//     }
//     console.log("Done");
// }


  
//   async function FindById(res , req){

   
//     const { id } = req.params
//     try {
//         const book = await bookModel.findById(id).populate("author").exec();
//         res.json(book)
//     }
//     catch (err) {
//         console.log(err)
//     }
//     console.log("Done");
//   }
 
  
//   const booksModel = mongoose.model("books", booksSchema)
//   module.exports = {
//     saveBooks,
//     FindAll,  

//   };
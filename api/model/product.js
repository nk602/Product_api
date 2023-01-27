const mongoose=require('mongoose')
const ProductSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    productId:String,
    productName:String,
    categoryId:Number,
    categoryName:String,
    phone:Number
})
module.exports=mongoose.model("Product",ProductSchema);
const mongoose = require('mongoose')

const NFTSchema = mongoose.Schema({
    // tokenId:{
    //     type: Number,
    //     require: true
    // },
    nftName:{
        type: String,
        require: true
    },
    nftPrice:{
        type: Number,
        require: true
    },
    nftVolumn:{
        type: String
    },
    nftOwner:{
        type: String,
        require: true
    },
    nftDescription:{
        type: String
    },
    nftImage:{
        type: String
    }
},{
    collection:"NFTs"
})

module.exports = mongoose.model("NFTs", NFTSchema)
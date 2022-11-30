const mongoose = require('mongoose')
const NFTs = require('../model/model')

exports.getNFT = async (req, res) => {
    try {
        const NFT = await NFTs.find()
        res.json(NFT)
    } catch (err) {
        res.json({ message: err })
    }
}

exports.createNFT = async (req, res) => {
    const url = req.protocol + "://" + req.get("host")
    const NFT = new NFTs({
        nftName: req.body.nftName,
        nftPrice: req.body.nftPrice,
        nftVolumn: req.body.nftVolumn,
        nftDescription: req.body.nftDescription,
        nftOwner: req.body.nftOwner,
        nftImage: url + "/public/" + req.file.filename
    })
    try {
        const saveNFT = await NFT.save().then((result) => {
            res.status(200).json({
                message: "created a successful nft!",
                nftCreated: {
                    nftName: result.nftName,
                    nftPrice: result.nftPrice,
                    nftDescription: result.nftDescription,
                    nftImage: result.nftImage,
                    nftVolumn: result.nftVolumn,
                    nftOwner: result.nftOwner
                }
            })
        })
        
        res.json(saveNFT)
    } catch (err) {
        res.json({ message: err })
    }
}

exports.getNFTsById = async (req, res) => {
    try {
        const NFT = await NFTs.findById(req.params._id)
        res.json(NFT)
    } catch (err) {
        res.json({ message: err })
    }
}


exports.removeNFT = (req, res) => {
    NFTs.remove({ _id: req.params._id }, function (err, response) {
        if (err) {
            res.status(201).json({
                code: 201,
                message: "Error from removeNFT"
            })
        } else {
            res.status(200).json({
                code: 200,
                message: "removeNFT successfully!",
                data: response
            })
        }
    })
}

exports.updateNFT = async (req, res) => {
    const url = req.protocol + '://' + req.get("host");
    
    const updateNFTs = {
        nftName: req.body.nftName,
        nftPrice: req.body.nftPrice,
        nftDescription: req.body.nftDescription,
        nftVolumn: req.body.nftVolumn,
        nftOwner: req.body.nftOwner,
        nftImage:req.body.nftImage || url + "/public/" + req.file.filename
    };
    NFTs.findByIdAndUpdate(
        { _id: req.params._id },
        updateNFTs,
        function (err, response) {
            if (err) {
                res.status(201).json({
                    code: 201,
                    message: "Error updateNFT",
                });
            } else {
                res.status(200).json({
                    code: 200,
                    message: "updateNFT Successfully!",
                    data: response,
                });
            }
        }
    );
}


const express = require('express')
const router = express.Router()
const multer = require('multer')
const {v4: uuidv4} = require('uuid')
const NFTs = require('../controller/controller')
const Swiper = require('../controller/swiper-controller')
const Collection = require('../controller/collection-ctl')
uuidv4()
const DIR = './public/'
const DIR_SWIPER = './swiper/'
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR)
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-')
        cb(null, uuidv4() + '-' + fileName)
    }
})

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if(file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/avif"){
            cb(null, true)
        }else{
            cb(null, false)
            return cb(new Error('Only .png, .jpg, .avif and .jpeg format allowed!'))
        }
    }
})

const storageSwiper = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR_SWIPER)
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-')
        cb(null, uuidv4() + '-' + fileName)
    }
})

var uploadSwiper = multer({
    storage: storageSwiper,
    fileFilter: (req, file, cb) => {
        if(file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/avif"){
            cb(null, true)
        }else{
            cb(null, false)
            return cb(new Error('Only .png, .jpg, .avif and .jpeg format allowed!'))
        }
    }
})

router.get('/collection', Collection.getCollection)
router.get('/collection/:_id', Collection.getCollectionById)
router.post('/collection', upload.fields([{name:"logo", maxCount:1},{name:"featuredImage",maxCount:1},{name:"banner", maxCount:1}]), Collection.createCollection)
router.patch('/collection/:_id', upload.fields([{name:"logo", maxCount:1},{name:"featuredImage",maxCount:1},{name:"banner", maxCount:1}]), Collection.updateCollection)
router.delete('/collection/:_id', Collection.removeCollection)

router.get('/data', NFTs.getNFT)
router.get('/data/:_id', NFTs.getNFTsById)
router.post('/data', upload.single('nftImage'), NFTs.createNFT)
router.patch('/data/:_id', upload.single('nftImage'), NFTs.updateNFT)
router.delete('/data/:_id', NFTs.removeNFT)

router.get('/swiper', Swiper.getSwiper)
router.get('/swiper/:_id', Swiper.getSwiperById)
router.post('/swiper', uploadSwiper.single('image'), Swiper.createSwiper)
router.patch('/swiper/:_id', uploadSwiper.single('image'), Swiper.updateSwiper)
router.delete('/swiper/:_id', Swiper.removeSwiper)
module.exports = router

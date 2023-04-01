const productController = require('../controllers/productController.js');
const imageController = require('../controllers/imageController.js');
const { image } = require('../models/index.js');
const router = require('express').Router()
const dbConfig = require('../config/db.Config');

router.post("/", productController.addProduct);
router.get('/', productController.getAllProducts);
router.put('/:id', productController.updateProduct);
router.get('/:id', productController.getProduct);
router.delete('/:id', productController.deleteProduct);
router.patch('/:id', productController.patchProduct);

router.get('/:id/image', imageController.getImage);
router.post('/:id/image', imageController.upload.single('image'), imageController.addImage);
router.get('/:id/image/:image_id', imageController.getImagebyID);
router.delete('/:id/image/:image_id', imageController.deleteImage);

module.exports = router
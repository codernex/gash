const express = require('express'); // Import express
const { getBrands, createBrand, updateBrand, deleteBrand } = require('../controller/brand');
const {verifyUser, isAdmin } = require('../middleware/auth');

const router = express.Router(); // Create a new router instance

router.route('/').get(getBrands).post(verifyUser,isAdmin, createBrand);
router
  .route('/:id')
  .patch(verifyUser, isAdmin, updateBrand)
  .delete(verifyUser,isAdmin, deleteBrand);

module.exports = router;



const router = require('express').Router();
const {
  sellSingleTicket,
  sellBulkTicket,
  findAll,
  findById,
  findByUsername,
  updateById,
  updateByUsername,
  deletedById,
  deleteByUsername,
  drawWinners,
} = require('./controllers');

router.route('/t/:id').get(findById).put(updateById).delete(deletedById);

router
  .route('/u/:username')
  .get(findByUsername)
  .put(updateByUsername)
  .delete(deleteByUsername);

router.post('/bulk', sellBulkTicket);
router.get('/draw', drawWinners);

router.route('/').get(findAll).post(sellSingleTicket);

module.exports = router;

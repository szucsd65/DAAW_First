const Rating = require('../models/Rating');
const Equipment = require('../models/Equipment');

async function createReview(req, res, next) {
  try {
    const { rating, text } = req.body;
    const equipmentId = req.params.id;
    
    const userId = req.session.user?._id || req.session.user?.email || 'demo-user';
    
    const review = await Rating.create({
      equipment: equipmentId,
      user: userId,
      rating: Number(rating),
      text: text || ''
    });
    
    await Equipment.findByIdAndUpdate(equipmentId, { 
      $push: { ratings: review._id } 
    });
    
    req.flash('success', ' Review added!');
    res.redirect(`/equipment/${equipmentId}`);
  } catch (err) {
    req.flash('error', err.message);
    res.redirect(`/equipment/${equipmentId}`);
  }
}

async function myRatings(req, res, next) {
  try {
    const userId = req.session.user?._id || req.session.user?.email;
    const ratings = await Rating.find({ user: userId })
      .populate('equipment', 'nom tipus')
      .sort({ createdAt: -1 });
    
    res.render('myRatings', { ratings, user: req.session.user });
  } catch (err) {
    next(err);
  }
}

async function globalRanking(req, res) {
  const rankings = await Rating.aggregate([
    { $group: { 
        _id: '$equipment', 
        avg: { $avg: '$rating' },
        count: { $sum: 1 }
      } },
    { $match: { avg: { $gt: 0 } } },
    { $sort: { avg: -1 } },
    { $limit: 3 }
  ]);

  const topEquipments = await Promise.all(
    rankings.map(async (rank) => {
      const equipment = await Equipment.findById(rank._id).select('nom tipus');
      return {
        _id: rank._id,
        nom: equipment ? equipment.nom : 'Unknown',
        tipus: equipment ? equipment.tipus : 'N/A',
        averageRating: Math.round(rank.avg * 10) / 10,
        ratings: [{ rating: Math.round(rank.avg) }]
      };
    })
  );

  res.render('topEquipment', { topEquipments });
}

module.exports = {
  createReview,
  myRatings,
  globalRanking
};

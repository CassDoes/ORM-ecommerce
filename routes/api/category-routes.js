const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

//Get ALL categories
router.get('/', (req, res) => {
  Category.findAll({
    attributes: [
      'id',
      'category_name'
    ],
    include: [
      {
        model: Product,
        attributes: [
          'id', 
          'product_name', 
          'price', 
          'stock', 
          'category_id'
        ]
      }
    ]
  })
    .then(dbCategoryData => res.json(dbCategoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//Get ONE category
router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  })
  .then(dbCategoryData => {
    if (!dbCategoryData) {
      res.status(400).json({ message: 'No category found with this id' });
      return;
    }
    res.json(dbCategoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

//Create NEW category*
router.post('/', (req, res) => {
  Category.create({
    id: req.body.id,
    category_name: req.body.category_name
  })
  .then(dbCategoryData => res.json(dbCategoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

//Update ONE category*
router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(dbCategoryData => {
    if (!dbCategoryData[0]) {
      res.status(400).json({ message: 'No category found with this id'});
      return;
    }
    res.json(dbCategoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

//Delete ONE category*
router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbCategoryData => {
    if (!dbCategoryData) {
      res.status(400).json({ message: 'No Category found with this id' });
      return;
    }
    res.json(dbCategoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;

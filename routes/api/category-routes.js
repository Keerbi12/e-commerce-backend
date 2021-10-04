const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categories = await Category.findAll({
      include: [{ model: Product }],
    })
    return res.status(200).json(categories)
  } catch (err) {
    return res.status(400).json(err)
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoriesId = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    })
    return res.status(200).json(categoriesId)
  } catch (err) {
    return res.status(400).json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryNew = await Category.create({
      category_name: req.body.category_name,
    })
    const updatedView = await Category.findAll({
      where: {
        category_name: req.body.category_name
      }
    })
    return res.status(200).json(updatedView)
  } catch (err) {
    return res.status(400).json(err)
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategory = await Category.update(
      {
        category_name: req.body.category_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
    return res.status(200).json(updateCategory)
  } catch (err) {
    return res.status(400).json(err)
  }
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    })
    return res.status(200).json(deleteCategory)
  } catch (err) {
    return res.status(400).json(err)
  }
});

module.exports = router;

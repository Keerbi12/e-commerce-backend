const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findAll({
      include: [{ model: Product }],
    })
    return res.status(200).json(tags)
  } catch (err) {
    return res.status(400).json(err)
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagsId = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    })
    return res.status(200).json(tagsId)
  } catch (err) {
    return res.status(400).json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tagNew = await Tag.create({
      tag_name: req.body.tag_name,
    })
    const updatedViewTag = await Tag.findAll({
      where: {
        tag_name: req.body.tag_name
      }
    })
    return res.status(200).json(updatedViewTag)
  } catch (err) {
    return res.status(400).json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const changeTag = await Tag.update(
      {
        tag_name: req.body.tag_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
    return res.status(200).json(changeTag)
  } catch (err) {
    return res.status(400).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    })
    return res.status(200).json(deleteTag)
  } catch (err) {
    res.status(400).json(err)
  }
});

module.exports = router;

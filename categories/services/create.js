import Category from '../schemas/category'

const Create = (req, res) => {
    let category = new Category(req.body)

    category
        .save()
        .then((created) => {
            if (!created) {
                res.status(404)
                    .json({
                        status: false,
                        data: {}
                    })
            }
            return res.status(201)
                .json({
                    status: true,
                    data: created
                })
        })
        .catch(err => res.status(500).json({status: false, data: {} }))
}

export default Create
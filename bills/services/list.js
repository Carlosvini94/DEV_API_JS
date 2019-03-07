import Bill from '../schemas/Bill'

const List = (req, res) => {
    Bill
        .find()
        .then((bills) => {
            if (!bills || !bills.length) {
                return res.status(404)
                    .json({
                        status: false,
                        data: []
                    })
            }
            return res.status(200)
                .json({
                    status: true,
                    data: bills
                })
        })
        .catch(err => res.status(500)
            .json({
                status: false,
                data: []
            }))
}
export default List
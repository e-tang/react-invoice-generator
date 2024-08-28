export const GET = async (req, res, next) => {
    console.log('GET /api/geninvoice')
    // send response
    res.json({ message: 'GET /api/geninvoice' })
}

export const POST = async (req, res, next) => {
    // get data from request body
    const data = req.body
    // do something with the data
    console.log(data)

    // send response
    console.log('POST /api/geninvoice')
}

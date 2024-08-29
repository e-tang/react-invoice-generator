
import { Invoice, TInvoice } from '../data/types'
import { initialInvoice, initialProductLine } from '../data/initialData'
import { useDebounce } from '@uidotdev/usehooks'
import InvoicePage from '../components/InvoicePage'
import FileSaver from 'file-saver'

import path from 'path'

import ReactPDF from '@react-pdf/renderer';

import invoiceTemplate from '../templates/invoice.template'

const generateInvoice = (data: TInvoice) => {


    function MyDocument () {
        return (<InvoicePage pdfMode={true} data={data} />)
    }

    console.log('GET /api/geninvoice')

    ReactPDF.render(<MyDocument />, `example.pdf`);
}

export const GET = async (req, res, next) => {
    let data = null
    data = {
        ...invoiceTemplate,
        // products: [initialProductLine]
    }
    // const debounced = useDebounce(data, 500)

    generateInvoice(data)

    // send response
    res.json({ message: `{"code": 200, "message": "an invoice has been generated at ${new Date()}"}` })
}

/**
 * POST /api/geninvoice
 * 
 * json body:
 * {
 *  "data": {
 *     "invoice": {
 *      "id": "123",
 *     "date": "2021-01-01",
 *    "dueDate": "2021-01-31",
 *   "from": {
 *     "name": "John Doe",
 *   "address": "123 Main St",
 *  "city": "Springfield",
 * "state": "IL",
 * "zip": "62701",
 * "country": "USA"
 * },
 * "to": {
 *  "name": "Jane Doe",
 * "address": "456 Elm St",
 * "city": "Springfield",
 * "state": "IL",
 * "zip": "62701",
 * "country": "USA"
 * },
 * "products": [
 * {
 * "name": "Product 1",
 * "description": "A product",
 * "quantity": 1,
 * "price": 100
 * }
 * ]
 * }
 * }
 * }
 * 
 * We don't really need the from part unless the invoice is from a different company / person
 * 
 * @param req 
 * @param res 
 * @param next 
 */
export const POST = async (req, res, next) => {
    // get data from request body
    const data = req.body
    // do something with the data
    console.log(data)

    // send response
    console.log('POST /api/geninvoice')
}

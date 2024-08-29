
import { Invoice, TInvoice } from '../data/types'
import { initialInvoice, initialProductLine } from '../data/initialData'
import { useDebounce } from '@uidotdev/usehooks'
import InvoicePage from '../components/InvoicePage'
import FileSaver from 'file-saver'

import ReactPDF from '@react-pdf/renderer';

export const GET = async (req, res, next) => {
    let data = null
    data = {
        ...initialInvoice,
        products: [initialProductLine]
    }
    // const debounced = useDebounce(data, 500)

    function MyDocument () {
        return (<InvoicePage pdfMode={true} data={data} />)
    }

    console.log('GET /api/geninvoice')

    ReactPDF.render(<MyDocument />, `example.pdf`);

    // send response
    res.json({ message: `{"code": 200, "message": "an invoice has been generated at ${new Date()}"}` })
}

export const POST = async (req, res, next) => {
    // get data from request body
    const data = req.body
    // do something with the data
    console.log(data)

    // send response
    console.log('POST /api/geninvoice')
}

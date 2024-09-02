
import { Invoice, ProductLine, TInvoice } from '../data/types'
import { initialInvoice, initialProductLine } from '../data/initialData'
import { useDebounce } from '@uidotdev/usehooks'
import InvoicePage from '../components/InvoicePage'
import FileSaver from 'file-saver'

import path from 'path'

import ReactPDF from '@react-pdf/renderer';

import invoiceTemplate from '../templates/invoice.json';

const generateInvoice = (data: TInvoice) => {
    let invoivePrefix = import.meta.env.VITE_INVOICE_TITLE_PREFIX || "";
    let invoiceTitle = invoivePrefix + (data.invoiceTitle || "invoice");

    function formateDate(date: string | Date, keyName: string) {
        let dateObj: Date | undefined = undefined;
        let formattedDate: string = '';

        if (keyName === 'invoiceDueDate') {
           let err: any = null;
           try {
                dateObj = new Date(date)
            }
            catch (error) {
                err = error;
            }
        
            // error or invalid date
            if (err || (isNaN(dateObj!.getTime()))) {
                // handle error or invalid date
                // for example, set a default value
                if (date)
                    formattedDate = date.toString();
                else {
                    date = new Date();
                    date.setDate(date.getDate() + 30);
                }
            }
        }
        else {
            // nothing
        }

        if (!formattedDate) {
            dateObj = new Date(date)
            formattedDate = dateObj.toLocaleDateString('en-AU', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            })
        }

        return formattedDate
    }

    function MyDocument () {
        return (<InvoicePage pdfMode={true} data={data} formatDate={formateDate} />)
    }

    // console.log('GET /api/geninvoice')
    let pdfFileName = `${path.resolve(import.meta.env.VITE_INVOICE_OUTPUT_PATH || "./", invoiceTitle)}.pdf`
    console.log(`generating invoice at ${pdfFileName}`)

    ReactPDF.render(<MyDocument />, `${pdfFileName}`);

    return pdfFileName;
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
 *      "company": "Company Name",
 *      "ABN": "123456789",
//  *     "name": "John Doe",
//  *   "address": "123 Main St",
//  *  "city": "Springfield",
//  * "state": "QLD",
//  * "postcode": "4000",
//  * "country": "AUSTRALIA"
 * },
 * "to": {
 *  "name": "Jane Doe",
 * "address": "456 Elm St",
 * "city": "Springfield",
 * "state": "QLD",
 * "postcode": "4000",
 * "country": "AUSTRALIA"
 * },
 * "products": [
 * {
 * "name": "Product 1",
 * "description": "A product",
 * "quantity": 1,
 * "unit_price": 100
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

    let pdfFileName = '';

    // get data from request body
    try {
        const data = req.body;
        // do something with the data
        console.log(data)

        // convert data to invoice
        let today = new Date()
        let defaultDueDate = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate())

        /*
            sample invoice data
            {
                "invoice": {
                    "id": 2433,
                    "date": "2024-01-01",
                    "due_date": "due on receipt",
                    "from": {
                        "company": "Nebula Exploration Pty. Ltd.",
                        "ABN": "12 345 678 901"
                    },
                    "to": {
                        "name": "Darth Vader",
                        "company": "Galactic Empire",
                        "address": "Death Star, 1 Empire Way, Galaxy Far Far Away",
                        "address2": "",
                        "suburb": "Death Star",
                        "state": "DS",
                        "postcode": "00001"
                    },
                    "products": [
                        {
                            "description": "Death Star",
                            "quantity": 1,
                            "unit_price": 1000000000000
                        },
                        {
                            "description": "Death Star Construction",
                            "quantity": 1,
                            "unit_price": 1000000000000
                        }
                    ]
                }
            }             
        */
        let address2 = (data.invoice.to.suburb || "");
        if (address2) {
            address2 += ", ";
        }
        if (data.invoice.to.city) {
            address2 += data.invoice.to.city + ", ";
        }
        if (data.invoice.to.state) {
            address2 += data.invoice.to.state + " ";
        }
        if (data.invoice.to.postcode) {
            address2 += data.invoice.to.postcode;
        }

        let titlePrefix = process.env.INVOICE_TITLE_PREFIX || "";

        let productLines = data.invoice.products.map((product: any) => {
            return {
                // ...initialProductLine,
                description: product.description,
                quantity: product.quantity,
                rate: product.unit_price
            }
        });

        let invoice : Invoice = {
            ...initialInvoice,

            companyName: data.invoice.from.company,
            name: "ABN: " + data.invoice.from.ABN,
            clientName: data.invoice.to.name,
            clientAddress: data.invoice.to.address,
            clientAddress2: address2,
            clientCountry: data.invoice.to.country,
            invoiceTitle: titlePrefix + data.invoice.id,
            productLines: productLines,
        }

        if (data.invoice.date) {
            invoice.invoiceDate = data.invoice.date;
        }
        else 
        {
            invoice.invoiceDate = today.toISOString();
        }

        if (data.invoice.due_date) {
            invoice.invoiceDueDate = data.invoice.due_date;
        }
        else 
        {
            invoice.invoiceDueDate = defaultDueDate.toISOString();
        }

        if (data.invoice.notes) {
            invoice.notes += data.invoice.notes;
        }

        if (data.invoice.terms) {
            invoice.term += data.invoice.terms;
        }

        // generate invoice
        pdfFileName = generateInvoice(invoice);
    }
    catch (error) {
        console.error(error)
        res.json({ message: `{"code": 500, "message": "an error occurred while generating the invoice: ${error.message}"}` })
        return;
    }

    // send response
    res.json({ message: `{"code": 200, "message": "an invoice has been generated at ${new Date()}: ${pdfFileName}"}` })
}

import defaultTemplate from './invoice.json'

import fs from 'fs'

const build = () => {
    if (import.meta.env.VITE_INVOICE_TEMPLATE) {
        if (fs.existsSync(import.meta.env.VITE_INVOICE_TEMPLATE)) {
            const template = fs.readFileSync(import.meta.env.VITE_INVOICE_TEMPLATE, 'utf8');
            return JSON.parse(template);
        }
        else
            console.error(`Template file not found: ${import.meta.env.VITE_INVOICE_TEMPLATE}`);
    }
    return null;
}

const customTemplate = build()

const invoiceTemplate = customTemplate || defaultTemplate

export default invoiceTemplate

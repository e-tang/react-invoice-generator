import InvoicePage from './components/InvoicePage'
import { Invoice } from './data/types'

import { BrowserRouter as Router, Route, Routes, Switch } from 'react-router-dom'

function Home({data, onInvoiceUpdated}) {
  return (
    <div className="app">
    <h1 className="center fs-30">React Invoice Generator</h1>
    <InvoicePage data={data} onChange={onInvoiceUpdated} />
  </div>
  )
}

function App() {
  const savedInvoice = window.localStorage.getItem('invoiceData')
  let data = null

  try {
    if (savedInvoice) {
      data = JSON.parse(savedInvoice)
    }
  } catch (_e) {}

  const onInvoiceUpdated = (invoice: Invoice) => {
    window.localStorage.setItem('invoiceData', JSON.stringify(invoice))
  }

  return (
    // <Router>
    // <Routes>
    //   <Route path="/invoice" element={<InvoicePage data={data} onChange={onInvoiceUpdated} />} />
    //     {/* <InvoicePage data={data} onChange={onInvoiceUpdated} />*/}
    //   {/* </Route>  */}
    //   <Route path="/"  element={ <Home data={data} onInvoiceUpdated={onInvoiceUpdated} />}>
    //     {/* <Home data={data} onInvoiceUpdated={onInvoiceUpdated} /> */}
    //   </Route>
    // </Routes>
    // </Router>
    <Home data={data} onInvoiceUpdated={onInvoiceUpdated} />
  )
}

export default App

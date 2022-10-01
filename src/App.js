import { PDFViewer, BlobProvider, StyleSheet } from '@react-pdf/renderer';
import React from 'react';
import './App.css';
import PDFDocument from './pages/PDFDocument';
import JsBarcode from 'jsbarcode';

const LOCAL_SERVER_URL = `http://192.168.0.101:9000`;

const styles = StyleSheet.create({
  viewer: {
    width: window.innerWidth,
    height: window.innerHeight * .5,
  },
})
const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';
function App() {

  const [title, setTitle] = React.useState(IS_DEVELOPMENT ? 'Title' : '');
  const [price, setPrice] = React.useState(IS_DEVELOPMENT ? 50 : '');
  const [pageSize, setPageSize] = React.useState(IS_DEVELOPMENT ? 'C8' : 'C8');
  const [barcode, setBarcode] = React.useState(IS_DEVELOPMENT ? '2342353453453' : '');
  const fileUrl = React.useRef(null);

  const multipartPostRequest = (File) => {
    const formData = new FormData();
    formData.append('file', File);
    fetch(`${LOCAL_SERVER_URL}/print`, {
      method: 'post',
      // headers: {
      //   'Content-Type': 'multipart/form-data',
      // },
      body: formData
    })
      .then((res) => {
        console.log("[multipartPostRequest].res", res);
        return res.json();
      })
      .then((data) => {
        console.log("[multipartPostRequest].data", JSON.stringify(data));
      })
      .catch(err => {
        console.log("[multipartPostRequest].err", err);
      })
      .finally(() => {
        // alert('Print request has been sent to printer...')
      })
  }


  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('title')) {
      setTitle(`${params.get('title')}`);
      setPrice(`${params.get('price')}`);
      setPageSize(`${params.get('pageSize')}`);
      let ItemId = params.get('ItemId');
      let canvas = document.createElement('canvas');
      JsBarcode(canvas, ItemId, { format: "upc" });
      const _barcode = canvas.toDataURL();
      setBarcode(`${_barcode}`)
    }
  }, [])
  if (!title) return <div className="">React App</div>;
  return (
    <div className="App">

      <PDFViewer style={styles.viewer}>
        <PDFDocument title={title} price={price} pageSize={pageSize} barcode={barcode} />
      </PDFViewer>

      <BlobProvider document={<PDFDocument title={title} price={price} pageSize={pageSize} barcode={barcode} />}>
        {({ blob, url, loading, error }) => {
          if (loading) {
            return 'Loading document...'
          } else {
            if (url && !fileUrl.current) {
              fileUrl.current = url;
              // console.log(blob);
              const blob_file = new File([blob], "blob_file.pdf", { type: "application/pdf", lastModified: new Date().getTime() });
              console.log('blob_file', blob_file);
              multipartPostRequest(blob_file);
            }

          }
        }}
      </BlobProvider>
    </div>
  );
}
export default App;

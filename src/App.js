import { PDFViewer, BlobProvider, StyleSheet } from '@react-pdf/renderer';
import React from 'react';
import './App.css';
import PDFDocument from './pages/PDFDocument';
// import { useBarcode } from '@createnextapp/react-barcode';
import Barcode from 'react-barcode';


// import File from './pages/File';
const LOCAL_SERVER_URL = `http://localhost:9000`;
const styles = StyleSheet.create({
  viewer: {
    width: window.innerWidth,
    height: window.innerHeight * .5,
  },
})
function App() {
  const [title, setTitle] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [pageSize, setPageSize] = React.useState('C8');
  const fileUrl = React.useRef(null);
  // const { inputRef } = useBarcode({
  //   value: 'createnextapp',
  //   options: {
  //     background: '#ccffff',
  //   }
  // });

  const multipartPostRequest = async (File) => {
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
        setTimeout(() => {
          if (process.env.NODE_ENV !== 'development') {
            alert('Print request has been sent to printer...')
          }
        }, 2000);
      })
  }


  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setTitle(`${params.get('title')}`);
    setPrice(`${params.get('price')}`);
    setPageSize(`${params.get('pageSize')}`);
    // const blob = pdf(PDFDocument).toBlob();
    // console.log('blob', blob);
    // window.print()
    // asyncFunc();
  }, [])
  // console.log('fileUrl', fileUrl.current);
  if (!title && !price) return;
  return (
    <div className="App">
      <PDFViewer style={styles.viewer}>
        <PDFDocument title={title} price={price} pageSize={pageSize} />
      </PDFViewer>

      <div style={{ background: "transparent", position: "absolute", top: '22%', right: 0, left: '26%' }}>
        <Barcode displayValue={false} height={45} width={1} value="barcode-example" />
      </div>

      <BlobProvider document={<PDFDocument title={title} price={price} pageSize={pageSize} />}>
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


      {/* <PDFDownloadLink document={<PDFDocument title={title} price={price} pageSize={pageSize} />} fileName="scrapy-file.pdf">
        {({ blob, url, loading, error }) => {
          if (loading) {
            return 'Loading document...'
          } else {
            console.log(blob);
            if (url && !fileUrl.current) {
              fileUrl.current = url;
              fetch(`${url}`).then(res => res.text()).then(data => console.log('data ---->', data)).catch(err => console.log(err))
              // window.open(`${url}`)
            }

          }
        }}
      </PDFDownloadLink> */}
    </div>
  );
}
export default App;

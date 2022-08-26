// import { PDFDownloadLink, renderToFile, BlobProvider } from '@react-pdf/renderer';
import React from 'react';
import './App.css';
import PDFDocument from './PDFDocument';
function App() {
  const [title, setTitle] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [pageSize, setPageSize] = React.useState('A6');
  // const asyncFunc = async () => {
  //   try {
  //     const result = await renderToFile(<PDFDocument title={'title'} price={'price'} />, `${__dirname}/my-doc.pdf`);
  //     console.log('result', result);
  //   } catch (error) {
  //     console.log('error', error);
  //   }

  // }
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
  if (!title && price) return;
  return (
    <div className="App">
      {/* <BlobProvider document={<PDFDocument title={"title"} price={"price"} />} fileName="somename.pdf">
        {({ blob, url, loading, error }) => {
          console.log(url, loading);
          return <div>There's something going on on the fly</div>;
        }
        }
      </BlobProvider> */}
      <PDFDocument title={title} price={price} pageSize={pageSize} />
    </div>
  );
}
export default App;

// import { PDFDownloadLink, renderToFile, BlobProvider } from '@react-pdf/renderer';
import React from 'react';
import './App.css';
import PDFDocument from './pages/PDFDocument';
import File from './pages/File';
function App() {
  const [title, setTitle] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [pageSize, setPageSize] = React.useState('A6');
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
      <PDFDocument title={title} price={price} pageSize={pageSize} />
      <File />
    </div>
  );
}
export default App;

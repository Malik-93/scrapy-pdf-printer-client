import React from 'react'
const LOCAL_SERVER_URL = `http://localhost:9000`;
export default function File() {
    // const multipartPostRequest = async () => {
    //     fetch(`${LOCAL_SERVER_URL}/print`, {
    //         method: 'post',
    //         headers: {
    //             'Content-Type': 'multipart/form-data',
    //             ...header,
    //         },
    //         body: formData
    //     })
    //         .then((res) => {
    //             console.log("[multipartPostRequest].res", res);

    //             return res.json();
    //         })
    //         .then((data) => {
    //             console.log("[multipartPostRequest].data", data);

    //         })
    //         .catch(err => {
    //             console.log("[multipartPostRequest].err", err);
    //         })
    // }
    return (
        <div style={{ margin: 30 }}>
            {/* <h2>Upload PDF File</h2>
            <form action={`${LOCAL_SERVER_URL}/print`} method="post" enctype="multipart/form-data">
                <input type="file" id="file" name="file" /><br />
                <input type="submit" value="Submit" style={{ marginTop: 10 }} />
            </form> */}
        </div >
    )
}

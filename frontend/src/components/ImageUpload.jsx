import React, {useState} from 'react';
import axios from 'axios';
import {URL} from '../constants';

export default function ImageUpload() {
    const [selectedFile, setSelectedFile] = useState("");
    const [urlUpload, setUrlUpload] = useState("");

    const uplaodImage = async (event) => {
        event.preventDefault();
        console.log("Submiutted Image", selectedFile);

        const getImageURL = async () => {

            const resp = await axios.post(`${URL}/s3image`, {fileType: selectedFile.type, fileName: selectedFile.name});
            console.log("URL ===", resp.data.url);
            setUrlUpload(resp.data.url);
            return resp.data.url;
        }

        const uploadImageFromURL = async (ImageURL) => {
            await fetch(ImageURL, {
                method: "PUT",
                headers: {
                    "Content-type": selectedFile.type
                },
                body: selectedFile
            });

            console.log("Uplaoded image?", ImageURL.split('?')[0]);
            return ImageURL.split('?')[0];
        }

        let response = await uploadImageFromURL(await getImageURL());
        console.log("Response after image upload===", response)
        // getImageURL()
        //     .then(r => console.log("Res", r))
        //     .then(r => {
        //         uploadImageFromURL().then()
        //     })
        //     .catch(err => console.log("Error in getting url image", err));
    }

    return (
        <div style={{display: "flex", flexWrap: "wrap"}}>
            <form id="formImage" onSubmit={uplaodImage}>
                <input id="imageInput" type="file" accept="image/*"
                       onChange={(e) => setSelectedFile(e.target.files[0])}/>
                <button type="submit">Uplaod Image</button>
            </form>
        </div>
    )
}

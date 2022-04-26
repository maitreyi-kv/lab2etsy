import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux';
import axios from 'axios';
import {URL} from '../../constants';


export const Edit = () => {
  const login = useSelector(state => state.login);

  const [name, setName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [country, setCountry] = useState("")
  const [city, setCity] = useState("")
  const [address, setAddress] = useState("")
  const [selectedFile, setSelectedFile] = useState(false)
  const [urlUpload, setUrlUpload] = useState("");
  const [onSubmit, setOnSubmit] = useState(false);

  useEffect(() => {
    const getProfile = async () => {
      const config = {
        method: 'get',
        url: `${URL}/user/profile`,
        headers: login ? {Authorization: login} : {}
      };

      console.log("URL", config.url);
      const resp = await axios(config);
      console.log("User Profile===", resp.data);
      setCity(resp.data.City)
      setCountry(resp.data.Country)
      setAddress(resp.data.Address)
      setName(resp.data.Name)
      setPhoneNumber(resp.data.Phone)
      setUrlUpload(resp.data.ImageURL)
      return resp.data;
    }
    getProfile().then(res => console.log("Profile get", res)).catch(err => console.log("err", err));

  }, [])

  const onChangeUsername = event => {
    setName(event.target.value)
  };

  const onChangePhNo = event => {
    setPhoneNumber(event.target.value)
  };

  const onChangeAddress = event => {
    setAddress(event.target.value)
  };

  const submit = async (e) => {
    e.preventDefault();
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
    console.log("Respose", response)

    const postUser = async () => {
      let data = {
        Name: name,
        Phone: phoneNumber,
        City: city,
        Country: country,
        Address: address,
        ImageURL: response
      };
      console.log("Data profile===", data);
      const resp = await axios.post(`${URL}/user/profile`, data, {
        headers: login ? {Authorization: login} : {}
      });
      console.log("URL ===", resp.data);
      return resp.data;
    }

    postUser().then(res => { console.log("Profile posting", res); setOnSubmit(true)}).catch(err => console.log("err", err));
  }

  return (
    <div style={{marginLeft: "100px", marginRight: "500px", float: 'right', width: "50%"}}>
      {
        onSubmit ? <h3>Registered</h3> :
          <form onSubmit={submit} style={{width: "60%"}}>
            <label> Name:<input type="text" name="name" value={name} onChange={onChangeUsername}/></label>
            <label> Phone:<input type="tel" name="phno" value={phoneNumber} onChange={onChangePhNo}/></label>
            <label> City:<input type="text" name="city" value={city} onChange={(e) => setCity(e.target.value)}/></label>
            <label htmlFor="country">Country:</label>
            <select name="country" id="country" value={country} onSelect={(e) => {
              console.log("country", e.target.value)
              setCountry(e.target.value)
            }}>
              <option value="India">India</option>
              <option value="Russia">Russia</option>
              <option value="China">China</option>
              <option value="Ukraine">Ukraine</option>
            </select>
            <label> Address :<input type="text" name="address" value={address} onChange={onChangeAddress}
                                    required/></label>
            <label>Photo: <input id="imageInput" type="file" accept="image/*"
                                 onChange={(e) => setSelectedFile(e.target.files[0])}/> </label>
            <input type="submit" value="Submit"/>
          </form>
      }
    </div>
  )
}

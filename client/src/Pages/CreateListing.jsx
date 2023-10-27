import React, { useState } from 'react'
import {getStorage,uploadBytesResumable,ref, getDownloadURL} from 'firebase/storage'
import { app } from '../../firebase.js';
const CreateListing = () => {
  const [files,setFiles]=useState([]);
  const [formData,setFormData]=useState({
    imageUrls:[],
  })
  const [imageUploadError,setImageUploadError]=useState(null);
  const [uploading,setUploading]=useState(false);

  const handleImageSubmit=(e)=>{
    if(files.length>0 && files.length + formData.imageUrls.length<7){
      setUploading(true);
      setImageUploadError(false);
      const promises = [];
      for(let i=0; i<files.length;i++){
        promises.push(storeImage(files[i]))
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        }).catch(err=>{
          setImageUploadError('Image upload failed (2mb max per image)');
          setUploading(false);
        })
    }
    else{
      setImageUploadError('You can only upload 6 images per listing')
      setUploading(false);
    }
  }
  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleDeleteImage=(index)=>{
    setFormData({
      ...formData,
      imageUrls:formData.imageUrls.filter((_,i)=>i!=index)
    })
  }
  return (
    <main className='p-3 max-w-4xl md:max-w-5xl mx-auto'>
        <h1 className='text-center font-bold text-2xl sm:text-3xl mt-3 mb-6'>CREATE LISTING</h1>
        <form className='flex flex-col sm:flex-row gap-5 md:gap-9'>
            <div className='flex flex-col gap-5 flex-1 md:border-r p-2'>
                <input type="text" placeholder='Name' id='name'
                className='border p-3 rounded-lg' maxLength={'70'} minLength={'10'} required/>
                <textarea type="text" placeholder='Description' id='description' 
                className='border p-3 rounded-lg' required/>
                <input type="text" placeholder='Address' id='address' 
                className='border p-3 rounded-lg' required/>
                
                <div className='flex gap-6 flex-wrap text-lg'>
                  <div className='flex gap-2 font-bold'>
                    <input className='w-5' type="checkbox" id='sale'/>
                    <span>Sale</span>
                  </div>
                  <div className='flex gap-2 font-bold'>
                    <input className='w-5' type="checkbox" id='rent'/>
                    <span>Rent</span>
                  </div>
                  <div className='flex gap-2 font-bold'>
                    <input className='w-5' type="checkbox" id='parking'/>
                    <span>Parking</span>
                  </div>
                  <div className='flex gap-2 font-bold'>
                    <input className='w-5' type="checkbox" id='furnished'/>
                    <span>Furnished</span>
                  </div>
                  <div className='flex gap-2 font-bold'>
                    <input className='w-5' type="checkbox" id='offer'/>
                    <span>Offer</span>
                  </div>
                </div>

                <div className='flex gap-4 md:gap-3 flex-wrap text-lg'>
                  <div className='flex justify-center items-center gap-1'>
                    <input className='rounded-lg w-10 p-1 sm:w-12 sm:p-2 border border-gray-300'   type="number" min='1'max='10'  id="bedrooms" required/>
                    <span className='font-bold'>Beds</span>
                  </div>
                  <div className='flex justify-center items-center gap-1'>
                    <input className=' rounded-lg w-10 p-1  sm:w-12 sm:p-2 border border-gray-300'   type="number"  min='1'max='10' id="bathrooms" required />
                    <span className='font-bold'>Baths</span>
                  </div>
                  <div className='flex justify-center items-center gap-2'>
                    <input className='rounded-lg  p-2 w-1/2 border border-gray-300'   type="number"  id="regularPrice" required />
                    <div className='flex flex-col'>
                      <p className='font-bold'>Regular Price</p>
                      <span>(₹ /month)</span>
                    </div>
                  </div>

                  <div className='flex justify-center items-center gap-2'>
                    <input className='rounded-lg p-2 w-1/2 border border-gray-300'   type="number"  id="discountPrice" required />
                    <div className='flex flex-col'>
                      <p className='font-bold'>Discount Price</p>
                      <span>(₹ /month)</span>
                    </div>
                  </div>
                </div>

            </div>
            
            <div className='flex flex-col flex-1 gap-4'>
              <div className='flex gap-2 justify-center items-center'>
                <p className='font-semibold text-lg'>Images:</p>
                <span className='text-slate-600 font-light sm:font-semibold'>(Max 6) images can be uploaded</span>
              </div>

              <div className='flex gap-4'>
                <input onChange={(e)=>setFiles(e.target.files)} className='p-3 border border-gray-300 w-full rounded-md' 
                type="file" id='images' accept='image/*' multiple/>

                <button disabled={uploading} type='button' onClick={handleImageSubmit} className=' p-3 rounded-md border border-green-700
                hover:shadow-lg disabled:opacity-80 uppercase hover:bg-green-100'>
                  {uploading? 'Uploading...':'Upload'}
                </button>

              </div>
              <p className='text-red-700 text-sm'>{imageUploadError && imageUploadError}</p>

              {
                formData.imageUrls.length>0 && formData.imageUrls.map((url,index)=>(
                  <div key={url} className='flex justify-between items-center'>
                    <img src={url} alt="image" className='w-20 h-20 object-cover rounded-md'/>
                    <button type='button' onClick={()=>handleDeleteImage(index)} className='text-red-800 uppercase rounded-lg font-bold w-20 h-6 border border-red-900 hover:bg-red-700 hover:text-white'>Delete</button>
                  </div>
                ))
              }
            <button className='p-3 bg-slate-600 text-white rounded-md
            disabled:opacity-80 hover:bg-slate-700'>CREATE LISTING</button>
            </div>
           
        </form>
    </main>
  )
}

export default CreateListing

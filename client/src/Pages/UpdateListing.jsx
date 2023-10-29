import React, { useEffect, useState } from 'react'
import {getStorage,uploadBytesResumable,ref, getDownloadURL} from 'firebase/storage'
import { app } from '../../firebase.js';
import { useSelector } from 'react-redux';
import { useNavigate ,useParams} from 'react-router-dom';
const UpdateListing = () => {
  const [files,setFiles]=useState([]);
  const {currentUser} = useSelector((state)=>state.user);
  const navigate=useNavigate();
  const [formData,setFormData]=useState({
    imageUrls:[],
    name:'',
    description:'',
    address:'',
    bathrooms:1,
    bedrooms:1,
    furnished:false,
    parking:false,
    type:'rent',
    offer:false,
    regularPrice:0,
    discountPrice:0
  })
  const [imageUploadError,setImageUploadError]=useState(null);
  const [uploading,setUploading]=useState(false);
  const [error,setError]=useState(false);
  const [loading,setLoading]=useState(false);
  const params=useParams();

  useEffect(()=>{
    const fetchListing=async ()=>{
        const res=await fetch(`/api/listing/get/${params.listingId}`);
        const data=await res.json();
        if(data.success===false){
            console.log(data.message);
            return;
        }
        setFormData(data);
    }
    fetchListing();
},[])
    

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
  };

  const handleChange=(e)=>{
    if(e.target.id === 'sell' || e.target.id === 'rent'){
      setFormData({
        ...formData,
        type: e.target.id
      })
    }
    if(e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer'){
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked
      })
    }
    if(e.target.type === 'number' || e.target.type === 'text' || e.target.type==='textarea'){
      setFormData({
        ...formData,
        [e.target.id]:e.target.value
      })
    }
  };

  const handleSubmit=async (e)=>{
    e.preventDefault();
    try{
      if(formData.imageUrls.length<1) return setError("You must upload atleast one image!")
      if(+formData.regularPrice<+formData.discountPrice) return setError("Discount price must be less than regular price!");
      setLoading(true);
      setError(false);
      const res= await fetch(`/api/listing/update/${params.listingId}`,{
        method: 'PUT',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userRef:currentUser._id
        })
      });
      const data= await res.json();
      setLoading(false);
      if(data.success===false){
        setError(data.message);
      }
      navigate(`/listing/${data._id}`);
    }
    catch(err){
      setError(err.message);
      setLoading(false);
    }
  }
  return (
    <main className='p-3 max-w-4xl md:max-w-5xl mx-auto'>
        <h1 className='text-center font-bold text-2xl sm:text-3xl mt-3 mb-6'>UPDATE LISTING</h1>
        <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-5 md:gap-9'>
            <div className='flex flex-col gap-5 flex-1 md:border-r p-2'>
                <input type="text" placeholder='Name' id='name' onChange={handleChange} value={formData.name}
                className='border p-3 rounded-lg' maxLength={'70'} minLength={'10'} required/>
                
                <textarea type="text" placeholder='Description' id='description' 
                className='border p-3 rounded-lg' onChange={handleChange} value={formData.description} required/>
                
                <input type="text" placeholder='Address' id='address' value={formData.address}
                className='border p-3 rounded-lg' onChange={handleChange} required/>
                
                <div className='flex gap-6 flex-wrap text-lg'>
                  <div className='flex gap-2 font-bold'>
                    <input className='w-5' type="checkbox" id='sell'
                      onChange={handleChange} checked={formData.type==='sell'}
                    />
                    <span>Sell</span>
                  </div>
                  <div className='flex gap-2 font-bold'>
                    <input className='w-5' type="checkbox" id='rent' 
                    onChange={handleChange} checked={formData.type==='rent'}/>
                    <span>Rent</span>
                  </div>
                  <div className='flex gap-2 font-bold'>
                    <input className='w-5' type="checkbox" id='parking'
                      onChange={handleChange} checked={formData.parking} />
                    <span>Parking</span>
                  </div>
                  <div className='flex gap-2 font-bold'>
                    <input className='w-5' type="checkbox" id='furnished'
                       onChange={handleChange} checked={formData.furnished}
                      />
                    <span>Furnished</span>
                  </div>
                  <div className='flex gap-2 font-bold'>
                    <input className='w-5' type="checkbox" id='offer'
                     onChange={handleChange} checked={formData.offer}/>
                    <span>Offer</span>
                  </div>
                </div>

                <div className='flex gap-4 md:gap-3 flex-wrap text-lg'>
                  <div className='flex justify-center items-center gap-1'>
                    <input className='rounded-lg w-10 p-1 sm:w-12 sm:p-2 border
                     border-gray-300' type="number" min='1'max='10'  onChange={handleChange} value={formData.bedrooms} id="bedrooms" required/>
                    <span className='font-bold'>Beds</span>
                  </div>
                  <div className='flex justify-center items-center gap-1'>
                    <input className=' rounded-lg w-10 p-1  sm:w-12 sm:p-2 border border-gray-300' 
                    type="number"  min='1'max='10' id="bathrooms" onChange={handleChange} value={formData.bathrooms} required />
                    <span className='font-bold'>Baths</span>
                  </div>
                  <div className='flex justify-center items-center gap-2'>
                    <input className='rounded-lg  p-2 w-1/2 border border-gray-300'   
                    type="number"  id="regularPrice" onChange={handleChange} value={formData.regularPrice} required />
                    <div className='flex flex-col'>
                      <p className='font-bold'>Regular Price</p>
                      <span>(₹ /month)</span>
                    </div>
                  </div>

                  {formData.offer && (
                    <div className='flex justify-center items-center gap-2'>
                      <input className='rounded-lg p-2 w-1/2 border border-gray-300'   
                      type="number"  id="discountPrice" onChange={handleChange} value={formData.discountPrice} required />
                      <div className='flex flex-col'>
                        <p className='font-bold'>Discount Price</p>
                        <span>(₹ /month)</span>
                      </div>
                    </div>
                  )}
                  
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
                hover:shadow-lg disabled:opacity-30 uppercase hover:bg-green-100'>
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
            <button disabled={loading || uploading} type='submit' className='p-3 bg-slate-600 text-white rounded-md
            disabled:opacity-80 hover:bg-slate-700'>
              {loading? 'Updating...':'UPDATE LISTING'}
            </button>
            {error && <p className='text-red-700 text-sm'>{error}</p>}
            </div>
           
        </form>
    </main>
  )
}

export default UpdateListing

'use client'
import React,{useState} from 'react'
import './style.css';
import Link from 'next/link';
import useSWR from 'swr';
const url = 'http://localhost:3000/api/shorts';
// import Masonry from 'react-masonry-css';


// const getData = async () =>{
//   const response = await fetch(url);
//   const data = await response.json();
//   // console.log(data);
//   return(data);
// }
// const fetcher = (url) => fetch(url).then((res) => res.json());
//     const { data, error, isLoading, isValidating, mutate, revalidate  } = useSWR('/api/posts', fetcher);


const Short = () => {
  // const [isOn, setIsOn] = useState(false);
  // const items = await getData();
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error, isLoading, isValidating, mutate, revalidate  } = useSWR(url, fetcher);
  
  const centerDiv = {
    display:'grid',placeItems:'center', height:'90vh',gap:'1rem',fontSize:'4rem'
  }

  console.log('items are',data);

  error && console.log('data when there are ', error);

  if (error) {
    return <div style={centerDiv}>Error loading data</div>;
  }

  

  if (!data) {
    return <div style={centerDiv}>Loading...</div>;
  }
  
    // const handleButtonClick = () => {
    //   setIsOn(!isOn);
    // };

  console.log('items are',data);
  return (
  <div>
      <div className='container'>
          {data.map(item=>(
                  <div key={item._id} className='container-component'> 
                          <div className='container-component-text'>
                               <h1 className='container-component-title'>{item.content}</h1>
                               <p>{item.username}</p>
                          </div>
                  </div>
        ))}
      </div>
  </div>
    
  )
}

export default Short
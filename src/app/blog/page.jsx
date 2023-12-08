'use client'
import React,{useState} from 'react'
import './style.css';
import Link from 'next/link';
import useSWR from 'swr';
const url = 'http://localhost:3000/api/posts';
// import Masonry from 'react-masonry-css';


// const getData = async () =>{
//   const response = await fetch(url);
//   const data = await response.json();
//   // console.log(data);
//   return(data);
// }
// const fetcher = (url) => fetch(url).then((res) => res.json());
//     const { data, error, isLoading, isValidating, mutate, revalidate  } = useSWR('/api/posts', fetcher);


const Blog = () => {
  const [isOn, setIsOn] = useState(false);
  // const items = await getData();
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error, isLoading, isValidating, mutate, revalidate  } = useSWR(url, fetcher);
  

  if (error) {
    return <div>Error loading data</div>;
  }
  const centerDiv = {
    display:'grid',placeItems:'center', height:'90vh',gap:'1rem',fontSize:'4rem'
  }

  if (!data) {
    return <div style={centerDiv}>Loading...</div>;
  }
  
    // const handleButtonClick = () => {
    //   setIsOn(!isOn);
    // };

  // console.log('items are',data);
  return (
  <div>
      {/* <button onClick={handleButtonClick} style={{ background: isOn ? 'green' : 'red' }}>
        {isOn ? 'ON' : 'OFF'}
      </button> */}
      <div className='container'>
          {data.map(item=>(
                  <Link key={item._id} className='container-component' href={`blog/${item._id}`}>
                          <div className='container-component__image'>
                              <img src={item.img} alt=""/>
                          </div> 
                          <div className='container-component-text'>
                          <h1 className='container-component-title'>{item.title}</h1>
                          <h3>{item.desc}</h3>
                          <p>By: {item.username}</p>
                          </div>
                  </Link>
              ))}
      </div>
  </div>
    
  )
}

export default Blog
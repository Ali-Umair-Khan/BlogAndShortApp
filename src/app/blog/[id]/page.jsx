'use client'
import useSWR from 'swr';

import './style.css'
const url = 'http://localhost:3000/api/posts';

 
export default  function Page({ params: { id } }) {
  const completeUrl = `${url}/${id}`
  const fetcher = (completeUrl) => fetch(completeUrl).then((res) => res.json());
  const { data, error, isLoading, isValidating, mutate, revalidate  } = useSWR(completeUrl, fetcher);
  

  if (error) {
    return <div>Error loading data</div>;
  }
  const centerDiv = {
    display:'grid',placeItems:'center', height:'90vh',gap:'1rem',fontSize:'4rem'
  }

  if (!data) {
    return <div style={centerDiv}><p>Loading...</p></div>;
  }
  return(
    <>
            <div key={data._id} className='content-box'>
                <h1>{data.title}</h1>
                <p>{data.desc}</p>
                <h3>{data.username}</h3>
                <div className='content-box--image'>
                  <img src={data.img} alt=""/>
                </div> 
                <div className='text__main'>
                  {data.content.split('\n').map((paragraph, index) => (
                      <p key={index} className='content-box--text'>{paragraph}</p>
                  ))}
                </div>
            </div>
    </>
   )
}

{/* <p className='content-box--text'>{item.content}</p> */}
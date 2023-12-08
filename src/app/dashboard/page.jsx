'use client'
import Blogs from '../components/blogs/blogs';
import Shorts from '../components/shorts/shorts';
import {useState} from 'react';
import './style.css';

const Dashboard = () => {
  const [switched, setSwitched] = useState(false);
  return(
    <div>
    <div className='btn-centered'><button onClick={()=>setSwitched(!switched)} className='dash-btn'>{switched ? 'Show Blogs !' : 'Show Shorts !'}</button></div>
    {switched ? <Shorts/> : <Blogs/>}
    </div>
  )
}

export default Dashboard
'use client'
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import {useState, useEffect} from 'react';

import './style.css'
const Shorts = ()=> {
    const [editingPost, setEditingPost] = useState(null);
    // const [stitle,setTitle]=useState('');
    // const [sdesc,setDesc]=useState('');
    // const [simage,setImage]=useState('');
    // const [scontent,setContent]=useState('');

  //   useEffect(() => {
  //   // Scroll to the top when the component mounts
  //   window.scrollTo(0, 0);
  // }, [editingPost]); 

   
    const session = useSession();
    const router = useRouter();
    if (session.status==='unauthenticated'){
        router?.push('/dashboard/auth/login')
    }
    // if (session.status === "unauthenticated") {
    //     router?.push("/dashboard/login");
    //   }
    const fetcher = (url) => fetch(url).then((res) => res.json());
    const { data, error, isLoading, isValidating, mutate, revalidate  } = useSWR(`/api/shorts?username=${session?.data?.user.name}`, fetcher);
    // data && console.log(data);
    // useEffect(()=>{
    //     console.log('updated fetch data is',data)
    // },[data])
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const content= e.target[0].value;
        const username = session && session?.data?.user.name;
        const postData = {
            content,username
        };
        try {
              await fetch('/api/shorts', {
              method: "POST",
              body: JSON.stringify(postData),
            });
            mutate();
            e.target.reset();
          } catch (error) {
            console.error('Error creating short:', error.message);
          }
    }

    const handleDelete = async(id) => {
      // e.preventDefault();
      const shouldDelete = window.confirm("Are you sure you want to delete this post?");

      if (!shouldDelete) {
        return; // If the user cancels the deletion, do nothing
      }

      try {
        await fetch(`/api/shorts/${id}`, {
        method: "DELETE",
      });
      mutate();
    } catch (error) {
      console.error('Error while deleting:', error.message);
    }
    }

    const handleEdit = async (id) => {
      try {
        const response = await fetch(`/api/shorts/${id}`);
        const postData = await response.json();
        setEditingPost(postData);
        window.scrollTo(0, 0);
      } catch (error) {
        console.error("Error fetching short for editing:", error);
      }
    };
  
    const handleUpdate = async (e) => {
      e.preventDefault();
      const { _id } = editingPost;
      const content = e.target[0].value;
      const postData = { content };
      // console.log(editingPost);
      // console.log('updated form data is', postData);
      // console.log('id is ', _id);
      try {
        await fetch(`/api/shorts/${_id}`, {
          method: "PUT",  
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        });
        mutate();
        // data && console.log('updated data is',data);
        setEditingPost(null);
        e.target.reset();
      } catch (error) {
        console.error("Error updating short:", error.message);
      }
    };

    const PostList = ({ posts, handleDelete, handleEdit }) => (
      <div className="main__col-left">
        {posts.map((post) => (
          <div key={post._id} className="main__col-post">
            <h1>{post.content}</h1>
            <div className='btn-box'>
                <button onClick={() => handleDelete(post._id)}>Delete</button>
                <button onClick={() => handleEdit(post._id)}>Edit</button>
            </div>
          </div>
        ))}
      </div>
    );
    
    const EditForm = ({ editingPost, handleUpdate }) => (
      <form onSubmit={handleUpdate} className="main__col-right">
        {/* Input fields for updating post */}
        <textarea
          placeholder="content"
          rows="20"
          cols="25"
          defaultValue={editingPost.content}
        />
        <button type="submit">Update</button>
      </form>
    );
    
    const SubmitForm = ({ handleSubmit }) => (
      <form className='main__col-right' onSubmit={handleSubmit}>
    
        <textarea placeholder="content" rows="20" cols="25"  />
    
        <button type="submit">Submit</button>
    </form>
    );

   
    const centerDiv= {
      // position:"fixed",
      // left:"50%",
      // top:"50%",
      // transform:"translate(-50%,-50%)",
      // fontSize:"4rem",
      // height:"90vh"
      display:"grid",
      placeItems:"center",
      height:"90vh",
      gap:"1rem",
      fontSize:"4rem"
    }
    
    
    if (session.status === 'authenticated'){
        return (
        <main className="main">
          {isLoading ? (
              <div style={centerDiv}><p>Loading...</p></div>
          ) : (
          <div className='main__col'>
            <div className="main__col-left">{PostList({ posts:data, handleDelete, handleEdit})}</div>
            {!editingPost ? <div className='main__col-right'>{SubmitForm({handleSubmit})}</div>
            : <div className='main__col-right'>{editingPost && EditForm({editingPost, handleUpdate})}</div>
            }
          </div> 
          )}      
          <button onClick={()=>window.scrollTo(0,0)} className='btn-top'>Go To Top</button>  
        </main>
    );
  }
}

export default Shorts
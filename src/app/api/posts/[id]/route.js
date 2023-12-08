import connect from '@/utils/db';
import Post from '@/models/post';
import { NextResponse } from 'next/server';
// export const config = {
//   api: {
//     bodyParser: false, // Disable built-in bodyParser
//   },
// };

// const jsonParser = bodyParser.json();




export const DELETE = async (req,{params}) =>{
  // await jsonParser(req, res);

    const {id} = params;

    try {
        await connect();
        await Post.findByIdAndDelete(id);
        return new NextResponse('Post deleted',{status:'201'})
    } catch (error) {
        console.error('error deleting post', error);
        return new NextResponse('database error',{status:'500'})
    }

}


export const GET = async(req, {params}) => {
  // await jsonParser(req, res);

    // const url = await req.url;
    const {id} = params;
    // const url = new URL(req.url);
    // const username = url.searchParams.get('username');

    try {
        await connect();
        const posts = await Post.findById(id);
        // return new NextResponse(posts.stringify())
        return new NextResponse(JSON.stringify(posts || []), { status: 200 });
    } catch (error) {
        console.error('error during fetching posts', error);
        return new NextResponse('database error',{status:'500'})
    }

}


export const PUT = async (req, {params}) => {
  // await jsonParser(req, res);
  const body = await req.json()
  // const {address} = body


    const { id } = params;
    // console.log("id is", id);
    // const { postData } = body;
    // console.log('data in req.body is',req.body);
    // console.log('Content Type:', req.headers['content-type']);
    // console.log('Parsed Request Body:', req.body);
    // console.log('Raw Request Body:', req.rawBody);
    // console.log('postData is ', postData);
    // const {title,desc,img,content}= postData;
    console.log('body is', body);
    const {title,desc,img,content}= body;
    try {
      await connect();
      const post = await Post.findByIdAndUpdate(
        id,
        { title, desc, img, content },
        { new: true } // ensure this option is set to get updated result.
      );
      console.log('post is ', post);
      return new NextResponse(JSON.stringify(post), { status: 200 });
    } catch (error) {
      console.error("Error updating post:", error);
      return new NextResponse("Error updating post", { status: 500 });
    }
  };
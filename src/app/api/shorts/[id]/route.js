import connect from '@/utils/db';
import Short from '@/models/short';
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
        await Short.findByIdAndDelete(id);
        return new NextResponse('Short deleted',{status:'201'})
    } catch (error) {
        console.error('error deleting short', error);
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
        const shorts = await Short.findById(id);
        // return new NextResponse(posts.stringify())
        return new NextResponse(JSON.stringify(shorts || []), { status: 200 });
    } catch (error) {
        console.error('error during fetching shorts', error);
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
    const {content}= body;
    try {
      await connect();
      const short = await Short.findByIdAndUpdate(
        id,
        {content},
        { new: true } // ensure this option is set to get updated result.
      );
      console.log('short is ', short);
      return new NextResponse(JSON.stringify(short), { status: 200 });
    } catch (error) {
      console.error("Error updating short:", error);
      return new NextResponse("Error updating short", { status: 500 });
    }
  };
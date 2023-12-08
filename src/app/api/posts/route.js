import connect from '@/utils/db';
import Post from '@/models/post';
import { NextResponse } from 'next/server';

export const POST = async (req, res) =>{
    const body = await req.json();
    const post = new Post(body);

    try {
        await connect();
        await post.save();
        return new NextResponse('Post created',{status:'201'})
    } catch (error) {
        console.error('error creating post', error);
        return new NextResponse('database error',{status:'500'})
    }

}

// The line const body = await req.json(); is used to parse the JSON data from the incoming HTTP request.
//  Let me break down the usage in detail:

// req Object:

// req is an abbreviation for "request" and represents the HTTP request object.
// In the context of Next.js API routes, req is an instance of Node.js's http.IncomingMessage class, extended with Next.js-specific features.

// req.json() Method:

// req.json() is a method provided by the Next.js framework for parsing the JSON data from the request body.
// It is an asynchronous function that returns a promise. The await keyword is used to wait for this promise to resolve before 
// continuing with the execution of the code.

// Parsing JSON Request Body:

// When a client sends a request with a JSON payload, such as in a POST request with a JSON body, the data is typically sent in the request body.
// req.json() reads the request stream, parses the JSON data, and returns a JavaScript object representing the parsed JSON.

// const body:

// The result of await req.json() is assigned to the variable body.
// The body variable now holds the JavaScript object that corresponds to the JSON data sent in the request body.

// Usage in the Code:

// In the provided code snippet, const body = await req.json(); is used in the context of handling a POST request to the /api/posts endpoint.
// It is assumed that the incoming request contains a JSON payload, and this payload is being stored in the body variable.
// The body variable is then used to create a new instance of the Post model (presumably defined elsewhere in the code).
// The values from the parsed JSON are used to initialize the properties of the new Post instance.
// In summary, const body = await req.json(); is a convenient way to extract and parse JSON data from the request body in a Next.js API route, 
// allowing you to work with the data in a structured JavaScript object format.

export const GET = async(req, res) => {
    // const url = await req.url;
    const url = new URL(req.url);
    const username = url.searchParams.get('username');

    try {
        await connect();
        // const posts = await Post.find(username && { username });

        const posts = await Post.find(username && {username});
            // console.log('Posts:', posts);

        // return new NextResponse(posts.stringify())
        return new NextResponse(JSON.stringify(posts || []), { status: 200 });
    } catch (error) {
        console.error('error during fetching posts', error);
        return new NextResponse('database error',{status:'500'})
    }

}
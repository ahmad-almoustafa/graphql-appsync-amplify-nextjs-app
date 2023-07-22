"use client";
import { useEffect, useState } from "react";
import {
  EditorState,
  convertToRaw,
  ContentState,
  convertFromHTML,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { stateToHTML } from "draft-js-export-html";
import { getCurrentAuthenticatedUser, getPresignedURL, uploadFile } from "@/utils/helpers";
import { CreatePostInput, Post, UpdatePostInput } from "@/src/API";
import Image from "next/image";
//using TypeScript's function overloads to define multiple signatures for the handleSubmit function.
type PostObj = CreatePostInput | UpdatePostInput;

interface PostFromProps {
  handleSubmit: (post: PostObj) => Promise<void>;
  post?: Post; // Add post prop to receive post data for editing
}

export default function PostForm({ handleSubmit, post }: PostFromProps) {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [title, setTitle] = useState("");
  const [featureImage, setFeatureImage] = useState<File | String>();

  const handleFileChange = (e: { target: { files: any[] } }) => {
    const file = e.target.files[0];
    setFeatureImage(file);
  };
  const handleEditorChange = (state: EditorState) => {
    setEditorState(state);
  };
  const getEditorPlainText = () => {
    // Get the raw content state from the editor state
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    // Extract the plain text from the raw content state
    const content = rawContentState.blocks
      .map((block) => block.text)
      .join("\n");
    // console.log("content :", content);
    return content;
  };

  /**
   * useEffect to populate the form fields with post data when the post prop changes
   * better approach that using Initial Values in State (useState(post?.title);) => If the post prop changes => the state won't automatically update .
   */
  useEffect(() => {
    const getInitialValues = async () => {
        // console.log('initial values',post); 
        if (post) {
    
          setTitle(post.title);
          // Convert post.body (HTML string) to ContentState
          const contentBlocks = convertFromHTML(post.body || "");
          const contentState = ContentState.createFromBlockArray(
            contentBlocks.contentBlocks,
            contentBlocks.entityMap
          );
    
          // Create initial EditorState
          const initialEditorState = EditorState.createWithContent(contentState);
          setEditorState(initialEditorState);
          
          if(post?.featureImage){
            // get the signed URL string
            setFeatureImage(await getPresignedURL(post?.featureImage));            
            //  console.log('featureImage',featureImage)
          }
          // Additional logic to set other fields if needed
    
        }
    }
    getInitialValues()
  }, [post]);


  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Get the markup text from the editor state
    const markupText = stateToHTML(editorState.getCurrentContent());
    const { username } = await getCurrentAuthenticatedUser();
    if (title && markupText) {
        // Upload the image file
        let imageUrl;
        // only if featureImage is a File (uploaded image), upload it to S3
        // Edit mode and image already existed => skip this part and the featureImage will be undefined and it will not affect the updatePost request 
        if (featureImage instanceof File) {
            imageUrl = await uploadFile(featureImage);
        }
      // Create the post object
      const postObj: PostObj = {
        title: title,
        body: markupText,
        username: username,
        featureImage: imageUrl,
      };
      if (post) {
        postObj.id = post.id; //add id for edit
      }
      console.log("postObj", postObj);
      handleSubmit(postObj); // handleSubmit passed from parent component
    }
  };
  return (
    <form onSubmit={onSubmit} className="max-w-xl mx-auto py-8">
      <div className="mb-4">
        <label htmlFor="title" className="block font-medium mb-1">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="title"
          className="w-full border border-gray-300 rounded-md p-2 required"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="body" className="block font-medium mb-1">
          Body
        </label>

        <Editor
          editorState={editorState}
          wrapperClassName="bg-white border border-gray-300 rounded-md p-2 h-96"
          onEditorStateChange={handleEditorChange}
        />
      </div>
    {/* The Editor component has a higher z-index value, which might be overlapping with the form elements => Add zIndex to fix */}
      <div className="mb-4" style={{ position: "relative", zIndex: 1 }}>
        <label htmlFor="featureImage" className="block font-medium mb-1">
          Feature Image
        </label>
        <input type="file" id="featureImage" onChange={handleFileChange} />
        {/* Display the image preview */}
        {featureImage && (
  <>
    {featureImage instanceof File ? (
      <Image
        src={URL.createObjectURL(featureImage)}
        alt="Image Preview"
        width={500}
        height={500}
      />
    ) : (
      <Image
        src={featureImage}
        alt="Image Preview"
        width={500}
        height={500}
      />
    )}
  </>
)}
    
      </div>
      <div>
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 z-10 "
        >
            {post? "Update Post":"Create Post"}
         
        </button>
      </div>
    </form>
  );
}

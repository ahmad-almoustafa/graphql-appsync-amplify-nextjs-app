  "use client";
  import { useState } from "react";
  import { EditorState, convertToRaw, ContentState } from "draft-js";
  import { Editor } from "react-draft-wysiwyg";
  import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
  import { stateToHTML } from "draft-js-export-html";
import { API, Auth } from "aws-amplify";
import { createPost } from "@/src/graphql/mutations";


  export default function CreatePost() {
    const [editorState, setEditorState] = useState(() =>
      EditorState.createEmpty()
    );
    const [title, setTitle] = useState("");
    const [featureImage, setFeatureImage] = useState(null);

    const handleFileChange = (e: { target: { files: any[]; }; }) => {
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
      console.log("content :", content);
      return content;
    };
    const handleSubmit = async(e: React.FormEvent) => {
      e.preventDefault();
      await savePost()

      // Perform submit logic here (e.g., send data to the server)
      // console.log("Title:", title);
      // console.log("Content:", markupText);
      // console.log("Feature Image:", featureImage);
      // console.log("editorState :", editorState);
      // Reset the form fields
      setTitle("");
      setEditorState(EditorState.createEmpty());
      setFeatureImage(null);
    };
    /**
     * Save the post to the GraphQL API
     * only cognito authenticated user can create post as per to our Auth rules
     * if we didn't put authMode => default mode is API key which can read posts only
     */
    const savePost = async () => {
     
      // Get the markup text from the editor state
      const markupText = stateToHTML(editorState.getCurrentContent());
      const {username} = await Auth.currentAuthenticatedUser({
        bypassCache: false, // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
      });
      if (title && markupText) {
        // Create the post object
        const post = {
          title: title,
          body:markupText,
          username:username,

        };
        try{
          const response = await API.graphql({
            query: createPost,
            variables: { input: post },
            authMode: "AMAZON_COGNITO_USER_POOLS",
          });
          console.log('Post created:', response);
        } catch (error) {
          console.log("Error saving post:", error);
        }
    }
    }
    return (
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto py-8">
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
            wrapperClassName="bg-white border border-gray-300 rounded-md p-2 h-96 z-1 "
            onEditorStateChange={handleEditorChange}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="featureImage" className="block font-medium mb-1">
            Feature Image
          </label>
          <input type="file" id="featureImage" onChange={handleFileChange} />
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 z-10 "
            onClick={handleSubmit}
          >
            Create Post
          </button>
        </div>
      </form>
    );
  }

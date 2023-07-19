# configure with your aws account
amplify configure

#create nextjs app

amplify init

#amplify + react
npm i @aws-amplify/ui-react aws-amplify

#add a new GraphQL API to your Amplify project.
#by default he API will be configured to use DynamoDB as the data source. 
#AppSyncBlogApp
amplify add api

#deploy your local backend resources defined in the Amplify project to the cloud.
#Do you want to generate code for your newly created GraphQL API =>
#this will genearte the 'src/graphql' folder + aws-exports.js  => generated files that facilitate interacting with your Amplify API from your frontend application.
#src/graphql/**/*.ts
amplify push 
#eidt schema and update
amplify push  --allow-destructive-graphql-schema-updates


# open your AWS account amolify console in the web browser
amplify console api


# regenerate using typescript
amplify remove api
amplify push


#add auth=> this will create the necessary AWS resources for authentication (Cognito ..etc)
amplify add auth
#then amplify push

#add authorization to your GraphQL API
#Each AppSync API is set with a default authorization mode => API Key
#amplify update api => then select the Authorization modes 
# you can see now in the AWS Appsynch console two Authorization providers: API Key and Amazon Cognito User Pool
# API key => if you try query: listPosts => would work beacaue Auth rule allow public access for read 
# API key => if you try mutation: createPost =>error: Unauthorized
# listPosts => now we have owner field which indicate the user who created the post("owner": "test_user_name" or "owner": null for posts created before adding the auth rule)
#@see https://docs.amplify.aws/lib/graphqlapi/authz/q/platform/js/
amplify update api
#then amplify push


#rich text editor for reactjs
#@see https://draftjs.org/docs/getting-started
npm install draft-js react-draft-wysiwyg
npm install --save-dev @types/react-draft-wysiwyg
npm install --save @types/draft-js
npm install draft-js-export-html



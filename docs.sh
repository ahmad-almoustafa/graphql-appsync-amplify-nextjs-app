# configure with your aws account
amplify configure

#create nextjs app

amplify init

#amplify + react
npm i @aws-amplify/ui-react aws-amplify

#add a new GraphQL API to your Amplify project.
#by default he API will be configured to use DynamoDB as the data source. 
amplify add api

# deploy your local backend resources defined in the Amplify project to the cloud.
amplify push 
#eidt schema and update
amplify push  --allow-destructive-graphql-schema-updates

#this will genearte the 'src/graphql' folder + aws-exports.js  => generated files that facilitate interacting with your Amplify API from your frontend application.

# open your AWS account amolify console in the web browser
amplify console api
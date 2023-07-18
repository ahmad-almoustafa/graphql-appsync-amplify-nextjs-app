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

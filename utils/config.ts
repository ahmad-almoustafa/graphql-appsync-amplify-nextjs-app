const config={
    siteName:'GraphQL-AppSync-Amplify-NextJS App',
    siteDescription:'A simple starter to get up and developing quickly with GraphQl, AppSync, Amplify and NextJS',
    author:'Ahmad Al Moustafa',
    authorURL:'https://ahmadalmoustafa.com',
    routes:[
        {
            label:'Home',
            path:'/',
            authenticated:false,
        },
        {
            label:'Blog',
            path:'/blog',
            authenticated:false,
        },
        {
            label:'Create Post',
            path:'/blog/create',
            authenticated:true,
        },
        {
            label:'My Blog',
            path:'/my-blog',
            authenticated:true,
        },
        {
            label:'Profile',
            path:'/profile',
            authenticated:false,
        },
    ]
}

export default config
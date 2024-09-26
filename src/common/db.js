import { MongoClient, ServerApiVersion } from 'mongodb'

const uri = 'mongodb+srv://lorimaralarcon:yJoAWduksV6P851j@cluster-express.n5p0t.mongodb.net/?retryWrites=true&w=majority&appName=cluster-express'

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
})

export default client
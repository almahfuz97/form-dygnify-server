const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;
// middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster1.bsiaqva.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const formDataCollection = client.db('form-dygnify').collection('formData');

        app.post('/formData', async (req, res) => {
            const body = req.body;
            const result = await formDataCollection.insertOne(body);
            res.send(result);
        })

    } catch (error) {
        console.log(error)
    }

}
run().catch(err => console.log(err.message))

app.listen(port, () => {
    console.log('listening to ', port)
})
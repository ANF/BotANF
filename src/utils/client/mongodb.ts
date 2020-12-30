import { MongoClient, MongoError } from 'mongodb';

export const mongoClient = new MongoClient(`${process.env.MONGO}`, { useNewUrlParser: true, useUnifiedTopology: true });
mongoClient.connect((err: MongoError) => {
    if (err) console.log(err);
    const collection = mongoClient.db("Bot-DB").collection("test");
    collection.findOne({ name: "delivery" }, (err: MongoError, result: any) => {
        if (err) console.log(err);
        console.log(result);
    });
});

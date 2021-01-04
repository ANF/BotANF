import { MongoClient, MongoError } from 'mongodb';
import 'dotenv/config';
import { logLevel, Logger } from '../helper/logger';

export const mongoClient = new MongoClient(`${process.env.MONGO}`, { useNewUrlParser: true, useUnifiedTopology: true });
const databaseName = "Bot-DB";

export async function getSettings(_logger: Logger) {
    return new Promise((resolve, reject) => {
        mongoClient?.connect((err: MongoError, client: MongoClient) => {
            if (err) _logger.log('Something went wrong while trying to connect to the database.', logLevel.warning, 'mongodb');
            const collection = client.db(databaseName, { noListener: true, returnNonCachedInstance: true }).collection("Config");
            collection.findOne({ name: "Config" }, (err: MongoError, result: any) => {
                if (err) _logger.log('Something went wrong while trying to get the configuration from the collection.', logLevel.warning, 'mongodb');
                resolve(result);
            });
        });
    })
}

export async function getTextFromMongoDB(_logger: Logger) {
    return new Promise((resolve, reject) => {
        mongoClient?.connect((err: MongoError, client: MongoClient) => {
            const collection = client.db(databaseName, { returnNonCachedInstance: false }).collection("test");
            collection.findOne({ name: "delivery" }, (err: MongoError, result: any) => {
                if (err) _logger.log('Something went wrong while trying to get the configuration from the collection.', logLevel.warning, 'mongodb');
                resolve(result);
            });
        });
    });
}

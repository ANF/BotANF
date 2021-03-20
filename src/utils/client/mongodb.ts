import { MongoClient, MongoError } from "mongodb";
import logger, { logLevel } from "../helper/logger";
import mongoSettings from "../config/MongoSettings";
import "dotenv/config";

export const mongoClient = new MongoClient(`${process.env.MONGO}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const databaseName = "Bot-DB";

export async function connect(_logger: any = logger) {
    return new Promise((resolve, reject) => {
        mongoClient?.connect((err: MongoError, client: MongoClient) => {
            if (err) {
                _logger.log(
                    `${err.name}${err.errmsg}`,
                    logLevel.warning,
                    "mongodb"
                );
                reject(err);
            }
            resolve(client);
        });
    });
}

export async function getSettings(_logger: any = logger) {
    if (!mongoClient.isConnected()) await connect();
    return new Promise((resolve, reject) => {
        const collection = mongoClient
            .db(databaseName, {
                noListener: true,
                returnNonCachedInstance: true,
            })
            .collection("Config");
        collection.findOne(
            { name: "Config" },
            (err: MongoError, result: any) => {
                if (err) {
                    logger.log(
                        `Something went wrong while trying to get the configuration from the collection.\n${err.name}${err.errmsg}`,
                        logLevel.warning,
                        "mongodb"
                    );
                    reject(err);
                }
                resolve(result);
            }
        );
    });
}

/**
 * This is just for the test command and will be removed later.
 */
export async function getTextFromMongoDB(_logger: any = logger) {
    if (!mongoClient.isConnected()) await connect();
    return new Promise((resolve, reject) => {
        const collection = mongoClient
            .db(databaseName, { returnNonCachedInstance: false })
            .collection("test");
        collection.findOne(
            { name: "delivery" },
            (err: MongoError, result: any) => {
                if (err) {
                    logger.log(
                        `Something went wrong while trying to get the configuration from the collection.\n${err.name}${err.errmsg}`,
                        logLevel.warning,
                        "mongodb"
                    );
                    reject(err);
                }
                resolve(result);
            }
        );
    });
}

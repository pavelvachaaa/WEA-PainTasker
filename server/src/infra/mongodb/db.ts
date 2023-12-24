import { connect } from 'mongoose';

/**
 * Funkce se na základě connection stringu připojí k mongu
 * @param connectionString 
 * @param dbName 
 */
const connectMongo = (connectionString: string, dbName="test") => {
    connect(connectionString,{dbName:dbName})
        .then(() => {
            console.log('MongoDB Connected');
        })
        .catch((error) => {
            console.error('MongoDB Connection Error:', error);
        });
}

export default connectMongo;
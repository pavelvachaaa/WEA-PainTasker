import { connect } from 'mongoose';

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
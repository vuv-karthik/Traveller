import mongoose from 'mongoose';

const MONGO_URI = 'mongodb://admin:password@localhost:27017/traveller?authSource=admin';

const tripSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    destination: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    budget: { type: Number, required: true, default: 0 },
    status: { type: String, enum: ['DRAFT', 'PLANNED', 'COMPLETED'], default: 'DRAFT' },
    activities: { type: [Object], default: [] },
}, { timestamps: true });

const Trip = mongoose.model('Trip', tripSchema);

async function verifyDbConnection() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB.');

        const dummyTrip = {
            userId: 'health-check-user',
            destination: 'Health Check City',
            startDate: new Date(),
            endDate: new Date(),
            budget: 100,
            status: 'DRAFT',
            activities: [],
        };

        console.log('Inserting dummy trip...');
        const createdTrip = await Trip.create(dummyTrip);
        console.log('Dummy trip inserted:', createdTrip._id);

        console.log('Reading dummy trip...');
        const foundTrip = await Trip.findById(createdTrip._id);
        if (!foundTrip) {
            throw new Error('Could not find the inserted trip.');
        }
        console.log('Dummy trip found:', foundTrip._id);

        console.log('Deleting dummy trip...');
        await Trip.findByIdAndDelete(createdTrip._id);
        console.log('Dummy trip deleted.');

        console.log('SUCCESS: MongoDB Connection Verified');
    } catch (error) {
        console.error('ERROR: MongoDB Verification Failed', error);
        process.exit(1);
    } finally {
        await mongoose.disconnect();
    }
}

verifyDbConnection();

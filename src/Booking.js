const mongoose=require("mongoose")

mongoose.connect("mongodb://localhost:27017/LoginFormPractice")
.then(()=>{
    console.log('mongoose connected');
})
.catch((e)=>{
    console.log('failed');
})


const bookingSchema = new mongoose.Schema({
    organizationName: {
        type: String,
        required: true
    },
    organizerName: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    numberOfSeats: {
        type: Number,
        required: true
    },
    purposeOfBooking: {
        type: String,
        required: true,
        enum: ['Exams', 'Seminar', 'Training and Workshop']
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    additionalRequirements: {
        type: [String], // Array of strings for multiple selections
        enum: ['Parking arrangements', 'Technical Support Services', 'Wifi access', 'Other']
    },
    priorityVenue1: {
        type: String,
        required: true,
        enum: ['Main auditorium', 'Mini auditorium']
    },
    priorityVenue2: {
        type: String,
        required: true,
        enum: ['Main auditorium', 'Mini auditorium']
    }
});

const Booking = mongoose.model('booking', bookingSchema);

module.exports = Booking;

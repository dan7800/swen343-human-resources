/**
 * Created by Nick on 5/4/2016.
 * This is how a timesheet will look in the db
 */

var timesheetSchema = new mongoose.Schema({
    employeeId: String,
    mon: Number,
    tues: Number,
    wed: Number,
    thur: Number,
    fri: Number,
    isApproved: Boolean,
    dateCreated: Date,
    latest: Boolean,
    lastModified: Date
});

timesheetSchema.statics.getByEmployeeIdAndDateCreated = function (id, date, cb) {
    return mongoose.model('Timesheet')
        .where('employeeId', id)
        .where('dateCreated', date)
        .exec(cb);
};

timesheetSchema.statics.getLatestForEmployee = function (id, cb) {
    return mongoose.model('Timesheet')
        .where('employeeId', id)
        .where('latest', true)
        .exec(cb);
};

module.exports = mongoose.model("Timesheet", timesheetSchema);
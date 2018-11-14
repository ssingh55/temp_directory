const AWS = require("aws-sdk"),
    fs = require("fs"),
    path = require("path"),
    getFileNameWithRangeOfDate = require("./getFileNameWithRangeOfDate").getFileNameWithRangeOfDate,
    verifyDate = require("./verifyDate").verifyDate,
    configRegion = require("./config.json").region,
    config = require("./config.json").download,
    configDownloadDirectory = config.downloadDirectory,
    configBucket = config.bucketDetails,
    logFileName = process.argv[2],
    startDate = process.argv[3],
    endDate = process.argv[4];

const ensureDirectoryExists = (filePath) => {
    let dirName = path.dirname(filePath);
    if (fs.existsSync(dirName)) {
        console.log("folder created");
        return true;
    }
    else {
        ensureDirectoryExists(dirName);
        fs.mkdirSync(dirName);
    }
}

const downloadFile = (bucketName, fileKeyName, startDate, endDate, downloadDirectory) => {

    if (fileKeyName === undefined) {
        console.log("please enter the file name with path in the script");
        console.log("Don't run it without shell script file");
        return;
    }
    if (startDate === undefined) {
        console.log("please enter the startdate in the script");
        console.log("Don't run it without shell script file");
        return;
    }
    if (endDate === undefined) {
        console.log("please enter the enddate in the script");
        console.log("Don't run it without shell script file");
        return;
    }
    AWS.config.update({ region: configRegion });

    ensureDirectoryExists(downloadDirectory);
    let s3 = new AWS.S3();
    if (verifyDate(startDate) && verifyDate(endDate)) {
        if (startDate <= endDate) {
            getFileNameWithRangeOfDate(fileKeyName, startDate, endDate).forEach((fileName) => {
                fs.exists(path.join(downloadDirectory, fileName), function (exists) {
                    if (exists) {
                        console.log("Skipping: " + fileName);
                    }
                    else {
                        console.log("Retrieving: " + fileName);
                        s3Download(fileName, downloadDirectory);
                    }
                })
            })
        }
        else {
            console.log("Start date should be less than end date");
        }
    }
    else {
        console.log("Some error with date format ensure that the date format and date entered is matching");
    }

    s3Download = (fileName, downloadDirectory) => {
        ensureDirectoryExists(path.join(downloadDirectory, fileName));
        let newDownloadFile = fs.createWriteStream(path.join(downloadDirectory, fileName));
        s3.getObject({ Bucket: bucketName, Key: fileName })
            .createReadStream()
            .on("error", (error) => {
                if (error.code === "NoSuchBucket") {
                    console.log("No such bucket found");
                }
                else
                    console.log("No Such Key found or Stream Content Length Mismatch");
            })
            .on("end", () => {
                console.log('Successfully got the object');
            })
            .pipe(newDownloadFile);
    };
}
downloadFile(configBucket.bucketName, logFileName, startDate, endDate, configDownloadDirectory);
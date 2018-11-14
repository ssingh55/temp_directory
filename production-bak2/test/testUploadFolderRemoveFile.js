let chai = require('chai'),
    expect = chai.expect,
    sinon = require('sinon'),
    uploadFolderModule = require('../production/uploadFolderRemoveFile'),
    uploadDir = uploadFolderModule.uploadDir,
    s3Upload = uploadFolderModule.s3Upload,
    directoryWalkSync = uploadFolderModule.directoryWalkSync,
    configAWSregion = uploadFolderModule.configAWSregion,
    fs = require('fs'),
    config = require('../production/config.json');

xdescribe('check the  aws region is getting updated or not', () => {
    it('should return the region name', () => {
        let expectedvalue = 'us-east-2',
            unexpectedvalue = 'others';
        expect(configAWSregion()).equal(expectedvalue)
        expect(configAWSregion()).not.equal(unexpectedvalue)
    })
})

describe('check the file are being uploaded or not ', () => {
    beforeEach(() => {
        spy = sinon.spy(console, 'log');
    });

    afterEach(() => {
        sinon.restore();
    });
    xit('should not be called atleast once when directorywalksnyc is called since file not present', () => {
        let spy = sinon.spy();
        let currentDirPath = 'exotel/logs';
        directoryWalkSync(currentDirPath, spy);
        expect(spy.calledOnce).not.equal(true);
    })
    xit('should return calledOnce when directorywalksnyc is called', () => {
        let spy = sinon.spy();
        let currentDirPath = './testuploadfolderdata';
        directoryWalkSync(currentDirPath, spy);
        expect(spy.calledOnce).equal(true);
    })
    xit('should not be called atleast calledOnce when directorywalksnyc is called since file modified time is less than 30 days', () => {
        let spy = sinon.spy();
        let currentDirPath = './testuploadfolderdata';
        directoryWalkSync(currentDirPath, spy);
        expect(spy.calledOnce).equal(true);
    })
    xit('should return calling directory recursively called to be true', () => {
        let currentDirPath = './testuploadfolderdata';
        directoryWalkSync(currentDirPath, spy)
        expect(spy.calledWith('calling recursive directorywalksync')).to.be.ok;
    })
    xit('should return called with an bucket not found error message', async () => {
        let filepath = './testuploadfolderdata/exotel/access-log/access.log-20180801.gz';
        let params = {
            Bucket: 'testcli9614',
            Key: filepath,
            Body: fs.createReadStream(filepath)
        };
        await s3Upload(params, filepath, 'testcli9614');
        expect(spy.calledWith('No bucket found')).to.be.ok;
    })
    xit('should return called with an check for params error message', () => {
        let filepath = './testuploadfolderdata/exotel/access-log/access.log-2018080.gz';
        let bucketName = config.upload.bucketDetails.bucketName;
        let params = {
            Bucket: bucketName,
            Key: filepath,
            Body: fs.createReadStream(filepath)
        };
        s3Upload(params, filepath, bucketName, (bool) => {
            expect(spy.calledWith('check for params are correct')).to.be.ok;
        })
    })
    xit('should return successfully uploaded message', async () => {
        let filepath = 'testuploadfolderdata/exotel/access-log/access.log-20180801.gz';
        let bucketName = config.upload.bucketDetails.bucketName;
        let params = {
            Bucket: bucketName,
            Key: filepath,
            Body: fs.createReadStream(filepath)
        };
        let result = await s3Upload(params, filepath, bucketName);
        expect(spy.calledWith("Successfully uploaded " + filepath + " to " + bucketName)).to.be.ok;
    })
    xit('should return file removed successfully message', async () => {
        let filepath = './testuploadfolderdata/exotel/access-log/access.log-20180801.gz';
        let bucketName = config.upload.bucketDetails.bucketName;
        let params = {
            Bucket: bucketName,
            Key: filepath,
            Body: fs.createReadStream(filepath)
        };
        await s3Upload(params, filepath, bucketName)
        expect(spy.calledWith("Removed the file " + filepath)).to.be.ok;
    })
    xit('should return inside the upload dir function', async () => {
        let bucketName = config.upload.bucketDetails.bucketName;
        let directoryPath = config.upload.localDirectoriesPathDetails.directoryPathArrays[0];
        uploadDir(directoryPath, bucketName);
        expect(spy.calledWith("inside uploadDir function")).to.be.ok;
    })
})
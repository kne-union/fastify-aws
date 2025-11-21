const fp = require('fastify-plugin');
const { S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
module.exports = fp(async (fastify, options) => {
  const { services } = fastify.aws;
  const createClient = () => {
    return new S3Client({
      region: options.oss.region,
      credentials: {
        accessKeyId: options.oss.accessKeyId,
        secretAccessKey: options.oss.secretAccessKey
      }
    });
  };

  const uploadFile = async ({ file, filename }) => {
    const client = createClient();
    const command = new PutObjectCommand({
      Bucket: options.oss.bucket,
      Key: filename,
      Body: file
    });
    return client.send(command);
  };
  const uploadFileStream = async ({ stream, filename }) => {
    const client = createClient();
    const command = new PutObjectCommand({
      Bucket: options.oss.bucket,
      Key: filename,
      Body: stream
    });
    return client.send(command);
  };
  const downloadFile = async ({ filename }) => {
    const client = createClient();
    const command = new GetObjectCommand({
      Bucket: options.oss.bucket,
      Key: filename
    });
    const response = await client.send(command);
    return response.Body;
  };
  const getFileStream = async ({ filename }) => {
    const client = createClient();
    const command = new GetObjectCommand({
      Bucket: options.oss.bucket,
      Key: filename
    });
    const response = await client.send(command);
    return response.Body;
  };
  const getFileLink = ({ filename, expires }) => {
    const client = createClient();
    const command = new GetObjectCommand({
      Bucket: options.oss.bucket,
      Key: filename
    });
    return getSignedUrl(client, command, { expiresIn: expires });
  };
  services.oss = {
    createClient,
    uploadFile,
    uploadFileStream,
    getFileLink,
    downloadFile,
    getFileStream
  };
});

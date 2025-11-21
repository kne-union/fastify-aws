const sesTransport = require('nodemailer-ses-transport');
const nodemailer = require('nodemailer');
const { SESClient } = require('@aws-sdk/client-ses');
const fp = require('fastify-plugin');
const pify = require('pify');

module.exports = fp(async (fastify, options) => {
  const client = new SESClient({ region: options.ses?.region });
  const transporter = nodemailer.createTransport(
    sesTransport({
      ses: client,
      awsAccessKeyId: options.oss.accessKeyId,
      awsSecretKey: options.oss.secretAccessKey
    })
  );

  fastify.aws.ses = mailOptions => {
    return pify(transporter.sendMail)(mailOptions);
  };
});

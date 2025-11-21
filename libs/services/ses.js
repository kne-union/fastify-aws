const nodemailer = require('nodemailer');
const { SESv2Client, SendEmailCommand } = require('@aws-sdk/client-sesv2');
const fp = require('fastify-plugin');
const pify = require('pify');

module.exports = fp(async (fastify, options) => {
  const { services } = fastify.aws;
  const sesClient = new SESv2Client({
    region: options.ses?.region,
    credentials: {
      accessKeyId: options.ses?.accessKeyId,
      secretAccessKey: options.ses?.accessKeySecret
    }
  });
  const transporter = nodemailer.createTransport({
    SES: { sesClient, SendEmailCommand }
  });

  services.ses = mailOptions => {
    return pify(transporter.sendMail.bind(transporter))(mailOptions);
  };
});

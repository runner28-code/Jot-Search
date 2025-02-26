import path from 'path';
import ejs from 'ejs';
import sendgrid from '@sendgrid/mail';
import config from '../config';

export const sendEmail = async (to: string|string[], subject: string, template: string, data: any) => {
  sendgrid.setApiKey(config.sendgridSecret || '');
  const from = config.mailSenderEmail || "donnie@aerovision.io";
  let message = { from, to, subject, html };
  const msg = { ...message, text: 'iDENTIFY'};

  try {
      await sendgrid.send(msg);
  } catch (error) {
      console.log(error);
      throw error;
  }
};

export const sendVerification = async (to: string, name: string) => {

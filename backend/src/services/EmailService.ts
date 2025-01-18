import path from 'path';
import ejs from 'ejs';
import config from '../config';

export const sendEmail = async (to: string|string[], subject: string, template: string, data: any) => {
  sendgrid.setApiKey(config.sendgridSecret || '');

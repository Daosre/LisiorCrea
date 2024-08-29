import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { user } from '@prisma/client';

import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;
  constructor(private readonly config: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.config.get('SMTP_HOST'),
      port: Number(this.config.get('SMTP_PORT')),
      secure: process.env.MAILER_SECURE === 'false',
      auth: {
        user: this.config.get('SMTP_EMAIL'),
        pass: this.config.get('SMTP_PASSWORD'),
      },
    });
  }

  async sendUserConfirmation(user: user, token: string) {
    const url = `${this.config.get('SERVER_URL')}/activate/${token}`;
    const emailHtml = `
    <h1>Hey ${user.lastName} ${user.firstName},</h1>
        <p>Bonjour, vous venez de vous inscrire sur notre site Lisior Créa. Merci d'activer votre compte.</p>
        <a href='${url}'> Cliquez Ici </a>
        ;`;

    await this.transporter.sendMail({
      from: this.config.get('SMTP_EMAIL'),
      to: user.email,
      subject: `Bienvenue ${user.email} Confirmation de l'email`,
      html: emailHtml,
    });
  }
}

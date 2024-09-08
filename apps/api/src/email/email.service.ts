import { Injectable } from '@nestjs/common';
import { ResendService } from 'nestjs-resend';
import {WelcomeEmail} from '@v1/email';
import { renderToStaticMarkup } from 'react-dom/server';
import React from 'react';

const emailTemplates = {
    welcome: WelcomeEmail,
    // passwordReset: 'PASSWORD_RESET_TEMPLATE',
};

const emailFromOptions = {
    support: 'support@wardenhq.ai',
    noReply: 'noreply@wardenhq.ai',
    team: 'team@wardenhq.ai',
    sales: 'sales@wardenhq.ai',
    marketing: 'marketing@wardenhq.ai',
    hey: 'hey@wardenhq.ai',
};

@Injectable()
export class EmailService {
    constructor(private readonly resendService: ResendService) { }
    
    async sendEmail(email: string, emailTemplate: keyof typeof emailTemplates, emailFrom: keyof typeof emailFromOptions, emailVariablesData: any) {
        const emailContent = renderToStaticMarkup(React.createElement(emailTemplates[emailTemplate], emailVariablesData));
        await
            this.resendService.send({
      from: 'Your Name <you@example.com>',
      to: 'user@gmail.com',
      subject: 'hello world',
      react: emailContent
    });
  }
        
    }


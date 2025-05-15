package com.khoinguyen.orderfood.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Service
public class SendEmailService {
    @Value("${spring.mail.from}")
    private String mailFrom;
    @Autowired
    private JavaMailSender mailSender;
    @Autowired
    private TemplateEngine templateEngine;
    public void sendMailWithTemplate(String to, String name, String activationCode) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        // Thiết lập context cho template
        Context context = new Context();
        context.setVariable("name", name);
        context.setVariable("activationCode", activationCode);

        // Load template
        String htmlContent = templateEngine.process("email-template", context);
        helper.setFrom(mailFrom);
        helper.setTo(to);
        helper.setSubject("Welcome to Our System!");
        helper.setText(htmlContent, true);

        mailSender.send(message);
    }
}

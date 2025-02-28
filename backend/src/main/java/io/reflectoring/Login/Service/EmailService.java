/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package io.reflectoring.Login.Service;

import org.springframework.stereotype.Service;

/**
 *
 * @author uday enter
 */
@Service
public class EmailService {

    public void sendEmail(String to, String subject, String text) {
        // Implement email sending logic (e.g., using JavaMailSender)
        System.out.println("Sending email to: " + to);
        System.out.println("Subject: " + subject);
        System.out.println("Text: " + text);
    }
}

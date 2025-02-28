///*
// * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
// * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
// */
//package io.reflectoring.Login;
//
///**
// *
// * @author uday enter
// */
//import io.jsonwebtoken.security.Keys;
//import java.util.Base64;
//import javax.crypto.SecretKey;
//
//public class JwtSecretGenerator {
//    public static void main(String[] args) {
//        SecretKey key = Keys.secretKeyFor(io.jsonwebtoken.SignatureAlgorithm.HS256); 
//        String base64Key = Base64.getEncoder().encodeToString(key.getEncoded());
//        System.out.println("Generated Secret Key: " + base64Key);
//    }
//}

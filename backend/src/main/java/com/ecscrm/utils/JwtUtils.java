package com.ecscrm.utils;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;

public class JwtUtils {

    private static String signKey = "Hgf73jshDhsh7236DHGhs73jsGHS93hd";
    private static Long expire = 43200000L; // valid time


    private static final Key hmacKey = Keys.hmacShaKeyFor(signKey.getBytes(StandardCharsets.UTF_8));

    /**
     * Generate Jwt Token
     * @param claims
     * @return
     */
    public static String generateJwt(HashMap<String,Object> claims){

        return Jwts.builder()
                .signWith(hmacKey, SignatureAlgorithm.HS256)
                .addClaims(claims)
                .setExpiration(new Date(System.currentTimeMillis() + expire))
                .compact();
    }

    /**
     * Parse Jwt Token
     * @param jwts
     * @return
     */
    public static Claims parseJwt(String jwts){

        return Jwts.parserBuilder()
                .setSigningKey(hmacKey)
                .build()
                .parseClaimsJws(jwts)
                .getBody();
    }
}

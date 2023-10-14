package com.shop_backend.controllers;

import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import org.springframework.http.HttpMethod;

@Component
public class StartupRequest {

    @EventListener(ContextRefreshedEvent.class)
    public void runHttpRequest() {
        // Create a RestTemplate to make the HTTP request
        RestTemplate restTemplate = new RestTemplate();
    

        restTemplate.exchange("http://localhost:8080/user/addToCart?userID=1&prod=3&quantity=3", HttpMethod.POST, null, String.class);
        restTemplate.exchange("http://localhost:8080/user/addToCart?userID=1&prod=11&quantity=1", HttpMethod.POST, null, String.class);
        restTemplate.exchange("http://localhost:8080/user/requestCurrentCart?userID=1", HttpMethod.POST, null, String.class);

        // Create an HttpEntity with the parameters and headers
        restTemplate.exchange("http://localhost:8080/product/addReview?productID=11&userID=1&header=Adorei o Produto&description=Completamente mudou a minha vida!&stars=4", HttpMethod.POST, null, String.class);

        return;
    }
}
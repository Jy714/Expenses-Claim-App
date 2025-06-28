package com.ecscrm.config;

import com.ecscrm.interceptor.LoginCheckInterceptor;
import com.ecscrm.json.JacksonObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;

import java.util.List;

@Slf4j
@Configuration
public class WebMvcConfig extends WebMvcConfigurationSupport {

    @Autowired
    private LoginCheckInterceptor loginCheckInterceptor;

    @Override
    protected void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(loginCheckInterceptor).addPathPatterns("/**").excludePathPatterns("/users/login");
    }

    @Override
    protected void extendMessageConverters(List<HttpMessageConverter<?>> converters) {
        log.info("converter added");
        MappingJackson2HttpMessageConverter converter = new MappingJackson2HttpMessageConverter();

        // this converter can convert Java Object to json data
        converter.setObjectMapper(new JacksonObjectMapper());

        // set converter to container
        converters.add(0,converter);
    }
}

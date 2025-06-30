package com.ecscrm.interceptor;

import com.alibaba.fastjson.JSONObject;
import com.ecscrm.common.Result;
import com.ecscrm.context.BaseContext;
import com.ecscrm.utils.JwtUtils;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.HandlerInterceptor;

@Slf4j
@Component
public class LoginCheckInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        String token = request.getHeader("token");

        // If token is null (not login)
        if(!StringUtils.hasLength(token)){
            log.error("token is null");
            Result result = Result.error("NOT_LOGIN");
            // Convert Java Object to Json Manually
            String json = JSONObject.toJSONString(result);
            response.getWriter().write(json);
            return false;
        }

        try{
            log.info("Parse Token: {}",token);

            Claims claims = JwtUtils.parseJwt(token);
            Integer userId = Integer.valueOf(claims.get("user_id").toString());

            log.info("Token Valid for User {}", userId);

            // set user id to threadLocal for future use
            BaseContext.setCurrentId(userId);

            return true;
        }catch(Exception ex) {
            log.error("Token parse failed.");
            Result result = Result.error("NOT_LOGIN");
            // Convert Java Object to Json Manually
            String json = JSONObject.toJSONString(result);
            response.getWriter().write(json);
            return false;
        }
    }
}

package com.ecscrm.controller;

import com.ecscrm.common.PageBean;
import com.ecscrm.common.Result;
import com.ecscrm.constant.ActiveStatusConstant;
import com.ecscrm.constant.MessageConstant;
import com.ecscrm.entity.dto.UserDTO;
import com.ecscrm.entity.pojo.User;
import com.ecscrm.service.UserService;
import com.ecscrm.utils.JwtUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.DigestUtils;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@Slf4j
@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;


    /**
     * User login
     * @param userDTO
     * @return
     */
    @PostMapping("/login")
    public Result login(@RequestBody UserDTO userDTO){

        String name = userDTO.getName();
        String password = userDTO.getPassword();

        User user = userService.getUserByName(name);

        if(user == null){
            return Result.error(MessageConstant.ACCOUNT_NOT_FOUND);
        }

        // Verify User Password
        password = DigestUtils.md5DigestAsHex(password.getBytes());

        if(!user.getPassword().equals(password)){
            // Incorrect Password
            return Result.error(MessageConstant.INCORRECT_NAME_AND_PASSWORD);
        }

        // Check User Status
        if(user.getStatus() == ActiveStatusConstant.DISABLE){
            // Account is deactivated
            return Result.error(MessageConstant.ACCOUNT_DISABLE);
        }


        // Generate Token
        HashMap<String,Object> claims = new HashMap<>();
        claims.put("user_id",user.getUserId());
        claims.put("user_name",user.getName());
        claims.put("role",user.getRole());

        String token = JwtUtils.generateJwt(claims);

        return Result.success(token);

    }

    /**
     * Insert user
     * @param userDTO
     * @return
     */
    @PostMapping
    public Result save(@RequestBody UserDTO userDTO){
        log.info("Insert user: {}",userDTO);

        userService.save(userDTO);

        return Result.success();

    }

    /**
     * user query
     * @param page
     * @param pageSize
     * @param user
     * @return
     */
    @GetMapping("/page")
    public Result page(@RequestParam(defaultValue = "1") Integer page,@RequestParam(defaultValue = "10")Integer pageSize,User user){
        log.info("user query: {}, {}, {}",page,pageSize,user);
        PageBean pageBean =  userService.page(page,pageSize,user);
        return Result.success(pageBean);
    }

    /**
     * enable or disable user
     * @param status
     * @param userId
     * @return
     */
    @PostMapping("/status/{status}")
    public Result startOrStop(@PathVariable Integer status,Integer userId){
        log.info("startOrStop: {} {}",status,userId);
        userService.startOrStop(status,userId);

        return Result.success();
    }
}

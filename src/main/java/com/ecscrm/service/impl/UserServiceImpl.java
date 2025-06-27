package com.ecscrm.service.impl;

import com.ecscrm.constant.PasswordConstant;
import com.ecscrm.constant.ActiveStatusConstant;
import com.ecscrm.entity.dto.UserDTO;
import com.ecscrm.mapper.UserMapper;
import com.ecscrm.entity.pojo.User;
import com.ecscrm.service.UserService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;

import java.time.LocalDateTime;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;

    /**
     * Insert User
     * @param userDTO
     */
    @Override
    public void save(UserDTO userDTO) {
        User user = new User();
        BeanUtils.copyProperties(userDTO,user);

        user.setPassword(DigestUtils.md5DigestAsHex(PasswordConstant.DEFAULT_PASSWORD.getBytes()));

        user.setStatus(ActiveStatusConstant.ENABLE);
        user.setCreatedTime(LocalDateTime.now());
        user.setUpdatedTime(LocalDateTime.now());

        userMapper.insert(user);

    }

    /**
     * Get User Info by Name and Password
     * @param name
     * @return
     */
    @Override
    public User getUserByName(String name) {

        User user =  userMapper.getByName(name);

        return user;
    }
}

package com.ecscrm.service.impl;

import com.ecscrm.common.PageBean;
import com.ecscrm.constant.PasswordConstant;
import com.ecscrm.constant.ActiveStatusConstant;
import com.ecscrm.entity.dto.UserDTO;
import com.ecscrm.mapper.UserMapper;
import com.ecscrm.entity.pojo.User;
import com.ecscrm.service.UserService;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;

import java.time.LocalDateTime;
import java.util.List;

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

    /**
     * user query
     * @param page
     * @param pageSize
     * @return
     */
    @Override
    public PageBean page(Integer page, Integer pageSize, User user) {
        PageHelper.startPage(page,pageSize);

        List<User> userList = userMapper.list(user);
        userList.forEach(users ->{users.setPassword("******");});

        Page<User> p = (Page<User>) userList;

        PageBean pageBean = new PageBean(p.getTotal(),p.getResult());

        return pageBean;
    }

    /**
     * enable or disable user
     * @param status
     * @param userId
     */
    @Override
    public void startOrStop(Integer status, Integer userId) {
        User user = new User();
        user.setStatus(status);
        user.setUserId(userId);
        user.setUpdatedTime(LocalDateTime.now());
        userMapper.update(user);
    }
}

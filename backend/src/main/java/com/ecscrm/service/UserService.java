package com.ecscrm.service;

import com.ecscrm.common.PageBean;
import com.ecscrm.entity.dto.UserDTO;
import com.ecscrm.entity.pojo.User;

public interface UserService {

    /**
     * Insert User
     * @param userDTO
     */
    void save(UserDTO userDTO);


    /**
     * Get User Info by Name and Password
     * @param name
     * @return
     */
    User getUserByName(String name);

    /**
     * user query
     * @param page
     * @param pageSize
     * @param user
     * @return
     */
    PageBean page(Integer page, Integer pageSize, User user);

    /**
     * enable or disable user
     * @param status
     * @param userId
     */
    void startOrStop(Integer status, Integer userId);
}

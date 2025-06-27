package com.ecscrm.service;

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
}

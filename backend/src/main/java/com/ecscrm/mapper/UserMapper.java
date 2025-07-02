package com.ecscrm.mapper;

import com.ecscrm.entity.dto.UserDTO;
import com.ecscrm.entity.pojo.User;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface UserMapper {

    @Insert("insert into users(name,email,password,phone,gender,role,status,created_time,updated_time)" +
            "values(#{name},#{email},#{password},#{phone},#{gender},#{role},#{status},#{createdTime},#{updatedTime})")
    void insert(User user);

    @Select("select * from users where name = #{name}")
    User getByName(String name);

    List<User> list(User user);

    void update(User user);
}

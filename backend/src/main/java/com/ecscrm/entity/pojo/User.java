package com.ecscrm.entity.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    private Integer userId;
    private String name;
    private String email;
    private String password;
    private Integer gender; // 1= male, 2=female
    private String phone;
    private Integer role; // 1=employee, 2=manager, 3=finance, 4=admin
    private Integer status; // activated = 1 , deactivated = 0 | default 1
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;
}

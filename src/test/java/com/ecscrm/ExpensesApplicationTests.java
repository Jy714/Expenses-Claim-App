package com.ecscrm;

import com.ecscrm.common.PageBean;
import com.ecscrm.entity.pojo.User;
import com.ecscrm.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class ExpensesApplicationTests {

	@Autowired
	private UserService userService;

	@Test
	void userQueryTest() {
		User user = new User();
		user.setName("tes");
		user.setRole(1);

		PageBean page = userService.page(1, 10, user);

		System.out.println("page: " + page);

	}

	@Test
	void testStartOrStop() {
		userService.startOrStop(0,1);

	}

}

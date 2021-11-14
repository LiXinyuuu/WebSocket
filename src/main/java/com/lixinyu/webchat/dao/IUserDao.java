package com.lixinyu.webchat.dao;

import com.lixinyu.webchat.pojo.User;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * NAME   :  WebChat/com.lixinyu.webchat.dao
 * Author :  lixinyu
 * Date   :  2016.01.08 14:30
 * TODO   :
 */
@Service(value = "userDao")
public interface IUserDao {
    List<User> selectAll(@Param("offset") int offset, @Param("limit") int limit);

    User selectUserByUserid(String userid);

    User selectCount();

    boolean insert(User user);

    boolean update(User user);

    boolean delete(String userid);
}

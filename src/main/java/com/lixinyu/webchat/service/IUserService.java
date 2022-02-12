package com.lixinyu.webchat.service;

import com.lixinyu.webchat.pojo.User;

import java.util.List;

/**
 * NAME   :  WebChat/com.lixinyu.webchat.service
 * Author :  lixinyu
 * Date   :  2021.11.08 14:36
 * TODO   :
 */
public interface IUserService {
    List<User> selectAll(int page, int pageSize);
    User selectUserByUserid(String userid);
    int selectCount(int pageSize);
    boolean insert(User user);
    boolean update(User user);
    boolean delete(String userid);
}

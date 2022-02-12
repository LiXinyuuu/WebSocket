package com.lixinyu.webchat.serviceImpl;

import com.lixinyu.webchat.dao.IUserDao;
import com.lixinyu.webchat.pojo.User;
import com.lixinyu.webchat.service.IUserService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * NAME   :  WebChat/com.lixinyu.webchat.serviceImpl
 * Author :  lixinyu
 * Date   :  2021.11.08 14:37
 * TODO   :
 */
@Service(value = "userService")
public class UserServiceImpl implements IUserService {

    @Resource private IUserDao userDao;

    @Override
    public List<User> selectAll(int page, int pageSize) {
        return userDao.selectAll(page, pageSize);
    }

    @Override
    public User selectUserByUserid(String userid) {
        return userDao.selectUserByUserid(userid);
    }

    @Override
    public int selectCount(int pageSize) {
        int pageCount = Integer.parseInt(userDao.selectCount().getUserid());
        return pageCount % pageSize == 0 ? pageCount/pageSize : pageCount/pageSize + 1;
    }

    @Override
    public boolean insert(User user) {
        return userDao.insert(user);
    }

    @Override
    public boolean update(User user) {
        return userDao.update(user);
    }

    @Override
    public boolean delete(String userid) {
        return userDao.delete(userid);
    }
}

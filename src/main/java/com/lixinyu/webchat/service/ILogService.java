package com.lixinyu.webchat.service;

import com.lixinyu.webchat.pojo.Log;

import java.util.List;

/**
 * NAME   :  WebChat/com.lixinyu.webchat.service
 * Author :  lixinyu
 * Date   :  2016.01.09 16:42
 * TODO   :
 */
public interface ILogService {
    List<Log> selectAll(int page, int pageSize);
    List<Log> selectLogByUserid(String userid, int page, int pageSize);
    int selectCount(int pageSize);
    int selectCountByUserid(String userid, int pageSize);
    boolean insert(Log log);
    boolean delete(String id);
    boolean deleteThisUser(String userid);
    boolean deleteAll();
}

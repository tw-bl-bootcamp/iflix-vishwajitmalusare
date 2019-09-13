package com.thoughtworks.bootcamp.user.service;

import java.io.UnsupportedEncodingException;

import org.springframework.stereotype.Service;

import com.thoughtworks.bootcamp.exception.UserException;
import com.thoughtworks.bootcamp.response.ResponseToken;
import com.thoughtworks.bootcamp.user.dto.LoginDTO;


@Service
public interface UserService {

	ResponseToken onLogin(LoginDTO loginDto) throws UserException, UnsupportedEncodingException;

}

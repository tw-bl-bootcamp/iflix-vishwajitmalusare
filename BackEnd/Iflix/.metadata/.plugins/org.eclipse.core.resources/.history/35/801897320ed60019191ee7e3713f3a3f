package com.thoughtworks.bootcamp.user.service;

import java.io.UnsupportedEncodingException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import com.thoughtworks.bootcamp.exception.UserException;
import com.thoughtworks.bootcamp.response.ResponseToken;
import com.thoughtworks.bootcamp.user.dto.LoginDTO;
import com.thoughtworks.bootcamp.user.model.User;
import com.thoughtworks.bootcamp.user.repository.UserRepository;
import com.thoughtworks.bootcamp.utility.TokenUtil;


@Service("userService")
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private TokenUtil tokenUtil;
	
	@Autowired
	Environment environment;

	@Override
	public ResponseToken onLogin(LoginDTO loginDto) {
		Optional<User> user = userRepo.findByEmailId(loginDto.getEmailId());
		ResponseToken response =null;
		if (user.isPresent()) {
			if(loginDto.getEmailId().equals(user.get().getEmailId())
				&& loginDto.getPassword().equals(user.get().getPassword())){
					String token = tokenUtil.createToken(user.get().getUserId());
					return new ResponseToken("succesfully",200,token);
				}
			return new ResponseToken("not valid password",400,"");
			}
		return new ResponseToken("not valid user",400,"");
		
		}

	}

package com.thoughtworks.bootcamp.user.controller;

import java.io.UnsupportedEncodingException;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.thoughtworks.bootcamp.exception.UserException;
import com.thoughtworks.bootcamp.response.ResponseToken;
import com.thoughtworks.bootcamp.user.dto.LoginDTO;
import com.thoughtworks.bootcamp.user.service.UserServiceImpl;

@RequestMapping("/iflix")
@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")

public class UserController {
	@Autowired
	UserServiceImpl userService;


	@PostMapping("/login")
	public ResponseEntity<ResponseToken> onLogin(@RequestBody LoginDTO loginDTO)
			throws UserException, UnsupportedEncodingException {

		ResponseToken response = userService.onLogin(loginDTO);

		return new ResponseEntity<>(response, HttpStatus.OK);
	}
}
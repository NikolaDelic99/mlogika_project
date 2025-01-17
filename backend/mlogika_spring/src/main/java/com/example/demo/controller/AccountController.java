package com.example.demo.controller;

import com.example.demo.model.Account;
import com.example.demo.model.Contact;
import com.example.demo.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.Map;




@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*", allowCredentials = "true")
@RestController
@RequestMapping("/api")
public class AccountController {
	@Autowired
    private AccountService service;

    @PostMapping("/addAccount")
    public ResponseEntity<Map<String, Object>> addAccount(@RequestBody Account account) {
        return service.addAccount(account);
    }

    @PostMapping("/updateAccount")
    public ResponseEntity<Map<String, Object>> updateAccount(@RequestBody Account account) {
        return service.updateAccount(account);
    }

    @PostMapping("/deleteAccount")
    public ResponseEntity<Map<String, Object>> deleteAccount(@RequestBody Map<String, String> request) {
        return service.deleteAccount(Integer.parseInt(request.get("id")));
    }

    @PostMapping("/addContact")
    public ResponseEntity<Map<String, Object>> addContact(@RequestBody Contact contact) {
        return service.addContact(contact);
    }

    @PostMapping("/deleteContact")
    public ResponseEntity<Map<String, Object>> deleteContact(@RequestBody Map<String, String> request) {
        return service.deleteContact(Integer.parseInt(request.get("id")));
    }

    @GetMapping("/getAccounts")
    public ResponseEntity<Map<String, Object>> getAccounts() {
        return service.getAccounts();
    }

    @GetMapping("/getContacts")
    public ResponseEntity<Map<String, Object>> getContacts(@RequestParam int accountId) {
        return service.getContacts(accountId);
    }
    
    @GetMapping("/getAccount/{accountId}")
    public ResponseEntity<Map<String,Object>> getAccount(@PathVariable  int accountId){
    	return service.getAccount(accountId);
    }
	
    
}

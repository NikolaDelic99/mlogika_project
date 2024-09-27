package com.example.demo.service;

import com.example.demo.model.Account;
import com.example.demo.model.Contact;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service

public class AccountService {
	@Autowired
    private JdbcTemplate jdbcTemplate;

    @Transactional
    public ResponseEntity<Map<String, String>> addAccount(Account account) {
        try {
            String sql = "INSERT INTO Account (firstname, lastname, username, salt,hash) VALUES (?, ?, ?, ?, ?)";
            jdbcTemplate.update(sql, account.getFirstname(), account.getLastname(), account.getUsername(), account.getSalt(), "");
            
            int accountId = jdbcTemplate.queryForObject("SELECT LAST_INSERT_ID()", Integer.class);
            
            sql = "INSERT INTO Contact (account_id, type, contact, primary_contact) VALUES (?, ?, ?, ?)";
            jdbcTemplate.update(sql, accountId, account.getContactType(), account.getContactContact(), true);
            
            Map<String, String> response = new HashMap<>();
            response.put("success", "true");
            response.put("id", String.valueOf(accountId));
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("success", "false");
            response.put("message", "Error adding account: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    public ResponseEntity<Map<String, String>> updateAccount(Account account) {
        try {
            String sql = "UPDATE Account SET firstname = ?, lastname = ?, username = ?, salt = ? WHERE id = ?";
            int updatedRows = jdbcTemplate.update(sql, account.getFirstname(), account.getLastname(), account.getUsername(), account.getSalt(), account.getId());
            
            Map<String, String> response = new HashMap<>();
            if (updatedRows > 0) {
                response.put("success", "true");
                response.put("id", String.valueOf(account.getId()));
            } else {
                response.put("success", "false");
                response.put("message", "No account found with id: " + account.getId());
            }
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("success", "false");
            response.put("message", "Error updating account: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @Transactional
    public ResponseEntity<Map<String, String>> deleteAccount(int id) {
        try {
            String sql = "DELETE FROM Contact WHERE account_id = ?";
            jdbcTemplate.update(sql, id);
            
            sql = "DELETE FROM Account WHERE id = ?";
            int deletedRows = jdbcTemplate.update(sql, id);
            
            Map<String, String> response = new HashMap<>();
            if (deletedRows > 0) {
                response.put("success", "true");
                response.put("id", String.valueOf(id));
            } else {
                response.put("success", "false");
                response.put("message", "No account found with id: " + id);
            }
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("success", "false");
            response.put("message", "Error deleting account: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    public ResponseEntity<Map<String, String>> addContact(Contact contact) {
        try {
            String sql = "INSERT INTO Contact (account_id, type, contact, primary_contact) VALUES (?, ?, ?, ?)";
            jdbcTemplate.update(sql, contact.getAccountId(), contact.getType(), contact.getContact(), contact.isPrimary());
            
            int contactId = jdbcTemplate.queryForObject("SELECT LAST_INSERT_ID()", Integer.class);
            
            Map<String, String> response = new HashMap<>();
            response.put("success", "true");
            response.put("id", String.valueOf(contactId));
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("success", "false");
            response.put("message", "Error adding contact: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    public ResponseEntity<Map<String, String>> deleteContact(int id) {
        try {
            String sql = "DELETE FROM Contact WHERE id = ?";
            int deletedRows = jdbcTemplate.update(sql, id);
            
            Map<String, String> response = new HashMap<>();
            if (deletedRows > 0) {
                response.put("success", "true");
                response.put("id", String.valueOf(id));
            } else {
                response.put("success", "false");
                response.put("message", "No contact found with id: " + id);
            }
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("success", "false");
            response.put("message", "Error deleting contact: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    public ResponseEntity<Map<String, Object>> getAccounts() {
        try {
            String sql = "SELECT a.firstname, a.lastname, a.username, c.type as contact_type, c.contact as contact_contact " +
                         "FROM Account a LEFT JOIN Contact c ON a.id = c.account_id WHERE c.primary_contact = true";
            List<Map<String, Object>> accounts = jdbcTemplate.queryForList(sql);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", "true");
            response.put("accounts", accounts);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", "false");
            response.put("message", "Error fetching accounts: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    public ResponseEntity<Map<String, Object>> getContacts(int accountId) {
        try {
            String sql = "SELECT type, contact, primary_contact FROM Contact WHERE account_id = ?";
            List<Map<String, Object>> contacts = jdbcTemplate.queryForList(sql, accountId);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", "true");
            response.put("contacts", contacts);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", "false");
            response.put("message", "Error fetching contacts: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

}

package com.example.demo.model;

public class Contact {
	private Long id;
    private Long accountId; 
    private String type; 
    private String contact;
    private boolean is_primary;

    
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public Long getAccountId() {
        return accountId;
    }
    public void setAccountId(Long accountId) {
        this.accountId = accountId;
    }
    public String getType() {
        return type;
    }
    public void setType(String type) {
        this.type = type;
    }
    public String getContact() {
        return contact;
    }
    public void setContact(String contact) {
        this.contact = contact;
    }
    public boolean isPrimary() {
        return is_primary;
    }
    public void setPrimary(boolean is_primary) {
        this.is_primary = is_primary;
    }
    

}

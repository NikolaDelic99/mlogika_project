package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Account {
	private Long id;
	private String firstname;
	private String lastname;
	private String username;
	@JsonProperty("password")
	private String salt;
	private String contactType;
	@JsonProperty("contact")
    private String contactContact;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id=id;
	}
	public String getFirstname() {
		return firstname;
	}
	public void setFirstname(String firstname) {
		this.firstname=firstname;
	}
	public String getLastname() {
		return lastname;
	}
	public void setLastname(String lastname) {
		this.lastname=lastname;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username=username;
	}
	public String getSalt() {
		return salt;
	}
	public void setSalt(String salt) {
		this.salt=salt;
	}
	public String getContactType() {
		return contactType;
	}
	public void setContactType(String contactType) {
		this.contactType = contactType;
	}
	public String getContactContact() {
		return contactContact;
	}
	public void setContactContact(String contactContact) {
		this.contactContact = contactContact;
	}

}

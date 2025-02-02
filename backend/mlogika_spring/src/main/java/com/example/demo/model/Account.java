package com.example.demo.model;



import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "Account")
public class Account {
    @Id
    @Column(name = "id")
    private Long id;

    @Column(name = "firstname")
    private String firstname;

    @Column(name = "lastname")
    private String lastname;

    @Column(name = "username")
    private String username;

    @Column(name = "salt")
    @JsonProperty("password")
    private String salt;

    @Transient  
    private String contactType;

    @Transient  
    @JsonProperty("contact")
    private String contactContact;
    
    @Column(name = "registrationTimestamp")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime registrationTimestamp;


    

	
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
	public LocalDateTime getRegistrationTimestamp() {
		return registrationTimestamp;
	}
	public void setRegistrationTimestamp(LocalDateTime registrationTimestamp) {
		this.registrationTimestamp=registrationTimestamp;
	}

}

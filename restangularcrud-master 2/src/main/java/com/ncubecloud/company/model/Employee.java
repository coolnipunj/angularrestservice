
package com.ncubecloud.company.model;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "employees")
public class Employee {

    private long id;
    private String firstName;
    private String lastName;
    private String emailId;
    private Date dob;
    private String state;
    private char gender;
    private String description;
    private boolean active;
 
    public Employee() {
  
    }
 
    public Employee(String firstName, String lastName, String emailId, Date dob, String state, String description, char gender, boolean active) {
         this.firstName = firstName;
         this.lastName = lastName;
         this.emailId = emailId;
         this.dob = dob;
         this.state = state;
         this.gender = gender;
         this.active = active;
         this.description = description;
    }
 


	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
        public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }
 
    @Column(name = "first_name", nullable = true)
    public String getFirstName() {
        return firstName;
    }
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
 
    @Column(name = "last_name", nullable = true)
    public String getLastName() {
        return lastName;
    }
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
 
    @Column(name = "email_address", nullable = true)
    public String getEmailId() {
        return emailId;
    }
    public void setEmailId(String emailId) {
        this.emailId = emailId;
    }

    @Column(name = "dob", nullable = true)
    public Date getDob() {
        return dob;
    }
    public void setDob(Date dob) {
        this.dob = dob;
    }
    
    
    @Override
	public String toString() {
		return "Employee [id=" + id + ", firstName=" + firstName + ", lastName=" + lastName + ", emailId=" + emailId
				+ ", dob=" + dob + ", state=" + state + ", gender=" + gender + ", description=" + description
				+ ", active=" + active + "]";
	}
    
    
    @Column(name = "state", nullable = true)
	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

    @Column(name = "gender", nullable = true)
	public char getGender() {
		return gender;
	}

	public void setGender(char gender) {
		this.gender = gender;
	}

    @Column(name = "active", nullable = true)
    public boolean getActive() {
        return active;
    }
    public void setActive(boolean active) {
    	System.out.println("tell me if u work yar " +  active);
        this.active = active;
    }
    @Column(name = "description", nullable = true)
    public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
	

}
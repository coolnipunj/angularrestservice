package com.ncubecloud.company.model.lov;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "state")
public class State {

    private long id;
    private String code;
    private String name;
 
    public State() {
  
    }
 
    public State(String code, String name) {
         this.code = code;
         this.name = name;
    }
 
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
        public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }
 
    @Column(name = "code", nullable = false)
    public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}
    @Column(name = "name", nullable = false)
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String toString() {
        return "State [id=" + id + ", code=" + code + ", name=" + name + "]";
    }
 
}
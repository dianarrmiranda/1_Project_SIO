package com.shop_backend.models.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity // This tells Hibernate to make a table out of this class
public class Review {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer ID;

    @ManyToOne
    private App_User UserID;
    private String Header;
    private String Description;
    private Integer NumStars;

    public Integer getID() {
        return ID;
    }
    public void setID(Integer iD) {
        ID = iD;
    }
    public App_User getUserID() {
        return UserID;
    }
    public void setUserID(App_User userID) {
        UserID = userID;
    }
    public String getHeader() {
        return Header;
    }
    public void setHeader(String header) {
        Header = header;
    }
    public String getDescription() {
        return Description;
    }
    public void setDescription(String description) {
        Description = description;
    }
    public Integer getNumStars() {
        return NumStars;
    }
    public void setNumStars(Integer numStars) {
        NumStars = numStars;
    }
}
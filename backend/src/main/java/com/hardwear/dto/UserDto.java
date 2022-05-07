package com.hardwear.dto;

import com.hardwear.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class UserDto {
    private Integer id;
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private String username;
    private String phone;
    private LocalDate date;

    public UserDto(String email, String password, String firstName, String lastName, String username,
                   String phone, LocalDate dateOfBirth) {

        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.phone = phone;
        this.date = dateOfBirth;
    }

    public static User toEntity(UserDto userDto) {
        return new User(
                userDto.getId(),
                userDto.getEmail(),
                userDto.getPassword(),
                userDto.getFirstName(),
                userDto.getLastName(),
                userDto.getUsername(),
                userDto.getPhone(),
                userDto.getDate()
        );
    }

    public static UserDto toDto(User user) {
        return new UserDto(
                user.getId(),
                user.getEmail(),
                user.getPassword(),
                user.getFirstName(),
                user.getLastName(),
                user.getUsername(),
                user.getPhone(),
                user.getDate()
        );
    }
}

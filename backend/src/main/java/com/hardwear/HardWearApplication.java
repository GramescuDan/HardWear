package com.hardwear;

import com.hardwear.exception.DatabaseException;
import com.hardwear.exception.UsernameAlreadyExistsException;
import com.hardwear.model.ConfirmationToken;
import com.hardwear.model.Role;
import com.hardwear.model.User;
import com.hardwear.service.confirmationtokenservive.ConfirmationTokenService;
import com.hardwear.service.roleservice.RoleService;
import com.hardwear.service.userservice.UserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@SpringBootApplication
@AllArgsConstructor
public class HardWearApplication implements CommandLineRunner {

    @Autowired
    private UserService userService;

    @Autowired
    private RoleService roleService;

    @Autowired
    private ConfirmationTokenService confirmationTokenService;

    private PasswordEncoder passwordEncoder;

    public static void main(String[] args) {
        SpringApplication.run(HardWearApplication.class, args);
    }

    @Override
    public void run(String... args) throws UsernameAlreadyExistsException, DatabaseException {
        insertPredefinedAdmin();
    }

    private void insertPredefinedAdmin() throws UsernameAlreadyExistsException, DatabaseException {
        String adminData = "admin";
        String adminPhoneNumber = "1234567890";
        String adminEmail = "hardwear@gmail.com";
        LocalDate dateOfBirth = LocalDate.of(2000, 12, 12);

        if (userService.findByUsername(adminData).isEmpty()) {

            Role role = new Role("ADMIN");
            roleService.saveOrUpdate(role);
            Set<Role> roles = new HashSet<>();
            roles.add(role);

            User admin = new User(adminEmail,
                    passwordEncoder.encode(adminData),
                    adminData,
                    adminData,
                    adminData,
                    adminPhoneNumber,
                    dateOfBirth,
                    roles);

            admin.setEnabled(true);

            userService.saveOrUpdate(admin);

            ConfirmationToken adminConfirmationToken = new ConfirmationToken(adminData,
                    LocalDateTime.of(LocalDate.of(2022, 2, 2), LocalTime.of(10, 11, 19)),
                    LocalDateTime.of(LocalDate.of(2022, 2, 2), LocalTime.of(10, 11, 19)),
                    LocalDateTime.of(LocalDate.of(2022, 2, 2), LocalTime.of(10, 11, 19)),
                    admin);

            confirmationTokenService.saveConfirmationToken(adminConfirmationToken);
        } else {
            System.out.println("Admin is already defined");
        }
    }

    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.setAllowCredentials(true);
        corsConfiguration.setAllowedOrigins(List.of("http://localhost:4200"));
        corsConfiguration.setAllowedHeaders(Arrays.asList("Origin", "Access-Control-Allow-Origin", "Content-Type",
                "Accept", "Authorization", "Origin, Accept", "X-Requested-With",
                "Access-Control-Request-Method", "Access-Control-Request-Headers"));
        corsConfiguration.setExposedHeaders(Arrays.asList("Origin", "Content-Type", "Accept", "Authorization",
                "Access-Control-Allow-Origin", "Access-Control-Allow-Origin", "Access-Control-Allow-Credentials"));
        corsConfiguration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        UrlBasedCorsConfigurationSource urlBasedCorsConfigurationSource = new UrlBasedCorsConfigurationSource();
        urlBasedCorsConfigurationSource.registerCorsConfiguration("/**", corsConfiguration);
        return new CorsFilter(urlBasedCorsConfigurationSource);
    }
}

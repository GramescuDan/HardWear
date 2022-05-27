package com.hardwear;

import com.hardwear.exception.DatabaseException;
import com.hardwear.exception.UsernameAlreadyExistsException;
import com.hardwear.model.*;
import com.hardwear.service.cartservice.CartService;
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
import java.util.*;

@SpringBootApplication
@AllArgsConstructor
public class HardWearApplication implements CommandLineRunner {

    @Autowired
    private UserService userService;

    @Autowired
    private CartService cartService;

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
        insertPredefinedRoles();
        insertPredefinedAdmin();
    }

    private void insertPredefinedRoles() throws DatabaseException {
        if (roleService.findByName("CLIENT").isEmpty()) {
            Role role = new Role("CLIENT");
            roleService.saveOrUpdate(role);
        }
        if (roleService.findByName("ADMIN").isEmpty()) {
            Role role = new Role("ADMIN");
            roleService.saveOrUpdate(role);
        }
    }

    private void insertPredefinedAdmin() throws UsernameAlreadyExistsException, DatabaseException {
        String adminData = "admin";
        String adminPhoneNumber = "1234567890";
        String adminEmail = "hardwear@gmail.com";
        String adminLocation = "Timisoara";

        if (userService.findByUsername(adminData).isEmpty()) {

            Set<Role> roles = new HashSet<>();
            Optional<Role> optionalRole = roleService.findByName("ADMIN");

            optionalRole.ifPresent(roles::add);

            User admin = new User(adminEmail,
                    passwordEncoder.encode(adminData),
                    adminData,
                    adminData,
                    adminData,
                    adminPhoneNumber,
                    adminLocation,
                    roles);

            admin.setEnabled(true);

            userService.saveOrUpdate(admin);

            ConfirmationToken adminConfirmationToken = new ConfirmationToken(adminData,
                    LocalDateTime.of(LocalDate.of(2022, 2, 2), LocalTime.of(10, 11, 19)),
                    LocalDateTime.of(LocalDate.of(2022, 2, 2), LocalTime.of(10, 11, 19)),
                    LocalDateTime.of(LocalDate.of(2022, 2, 2), LocalTime.of(10, 11, 19)),
                    admin);

            confirmationTokenService.saveConfirmationToken(adminConfirmationToken);
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

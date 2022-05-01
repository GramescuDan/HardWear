package com.hardwear.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

import static javax.persistence.GenerationType.SEQUENCE;

@Entity
@Table(name = "confirmation_token")
@Getter
@Setter
@NoArgsConstructor
public class ConfirmationToken {

    @Id
    @GeneratedValue(strategy = SEQUENCE)
    @SequenceGenerator(name = "confirmation_token_sequence", sequenceName = "confirmation_token_sequence", allocationSize = 1)
    private Integer id;

    @Column(name = "token", nullable = false, columnDefinition = "TEXT")
    private String token;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd hh:mm:ss")
    @Column(name = "token_creation_date", nullable = false)
    private LocalDateTime tokenCreatedAt;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd hh:mm:ss")
    @Column(name = "token_expiration_date", nullable = false)
    private LocalDateTime tokenExpiresAt;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd hh:mm:ss")
    @Column(name = "token_confirmation_date", nullable = false)
    private LocalDateTime tokenConfirmedAt;

    @ManyToOne
    @JoinColumn(nullable = false, name = "user_id")
    private User User;

    public ConfirmationToken(String token, LocalDateTime tokenCreatedAt, LocalDateTime tokenExpiresAt, LocalDateTime tokenConfirmedAt, User User) {
        this.token = token;
        this.tokenCreatedAt = tokenCreatedAt;
        this.tokenExpiresAt = tokenExpiresAt;
        this.tokenConfirmedAt = tokenConfirmedAt;
        this.User = User;
    }
}
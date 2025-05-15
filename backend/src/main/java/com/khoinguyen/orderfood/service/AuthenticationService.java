package com.khoinguyen.orderfood.service;

import com.khoinguyen.orderfood.dto.request.AuthenticationReq;
import com.khoinguyen.orderfood.dto.response.AuthenticationResponse;
import com.khoinguyen.orderfood.enums.Role;
import com.khoinguyen.orderfood.exception.NotFound;
import com.khoinguyen.orderfood.mapper.UserMapper;
import com.khoinguyen.orderfood.model.User;
import com.khoinguyen.orderfood.repository.UserRepository;
import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jwt.JWTClaimsSet;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.Map;

@Slf4j
@Service
public class AuthenticationService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    protected final String JWT_KEY;
    public AuthenticationService(UserRepository userRepository, @Value("${jwt.key}") String jwtKey,UserMapper userMapper) {
        this.userRepository = userRepository;
        this.JWT_KEY = jwtKey;
        this.userMapper=userMapper;
    }
    public AuthenticationResponse authentication(AuthenticationReq authenticationReq){
        var user=userRepository.findByEmail(authenticationReq.getEmail()).orElseThrow(()-> new NotFound("Email not found"));
        PasswordEncoder passwordEncoder =new BCryptPasswordEncoder(10);
        boolean isLogin=  passwordEncoder.matches(authenticationReq.getPassword(),user.getPassword());
        if(!isLogin) throw  new NotFound("Sai");
        var token=generateToken(user);
        return AuthenticationResponse.builder()
                .token(token)
                .user(userMapper.toUserResponse(user))
                .build();
    }
//    public IntrospectResponse introspect(IntrospectRequest request) throws JOSEException, ParseException {
//        var token=request.getToken();
//        JWSVerifier verifier=new MACVerifier(JWT_KEY.getBytes());
//        SignedJWT signedJWT=SignedJWT.parse(token);
//        Date expiryTime=signedJWT.getJWTClaimsSet().getExpirationTime();
//        var isVerify=signedJWT.verify(verifier);
//        return IntrospectResponse.builder()
//                .valid(isVerify&&expiryTime.after(new Date()))
//                .build();
//    }
    private String generateToken(User user){
        JWSHeader header=new JWSHeader(JWSAlgorithm.HS512);
        JWTClaimsSet jwtClaimsSet=new JWTClaimsSet.Builder()
                .subject(user.getEmail())
                .issuer("khoinguyen.com")
                .issueTime(new Date())
                .expirationTime(new Date(
                        Instant.now().plus(24, ChronoUnit.HOURS).toEpochMilli()
                ))
                .claim("scope",buildScope(user))
                .build();
        Payload payload=new Payload(jwtClaimsSet.toJSONObject());
        JWSObject jwsObject=new JWSObject(header,payload);
        try {
            jwsObject.sign(new MACSigner(JWT_KEY.getBytes()));
            return jwsObject.serialize();
        } catch (JOSEException e) {
            log.error("cannot");
            throw new RuntimeException(e);
        }
    }

    private String buildScope(User user){
//        StringJoiner stringJoiner=new StringJoiner(" ");

        return user.getRole().toString();
    }


    public AuthenticationResponse authenticateWithOAuth2(OAuth2User oauth2User) {
        Map<String, Object> attributes = oauth2User.getAttributes();
        String email = (String) attributes.get("email");

        // Kiểm tra user đã tồn tại chưa
        var userOptional = userRepository.findByEmail(email);

        User user;
        if (userOptional.isPresent()) {
            user = userOptional.get();
        } else {
            // Tạo user mới nếu chưa tồn tại
            user = User.builder()
                    .email(email)
                    .password("")
                    .active(true)
                    .role(Role.CUSTOMER)
                    .build();
            userRepository.save(user);
        }

        var token = generateToken(user);
        return AuthenticationResponse.builder()
                .token(token)
                .user(userMapper.toUserResponse(user))
                .build();
    }
}

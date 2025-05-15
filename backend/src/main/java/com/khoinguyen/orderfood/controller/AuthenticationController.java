package com.khoinguyen.orderfood.controller;

import com.khoinguyen.orderfood.dto.request.AuthenticationReq;
import com.khoinguyen.orderfood.dto.response.AuthenticationResponse;
import com.khoinguyen.orderfood.service.AuthenticationService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@AllArgsConstructor
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    @PostMapping("/log-in")
    AuthenticationResponse login(@RequestBody AuthenticationReq authenticationReq) {
        return authenticationService.authentication(authenticationReq);
    }

    @GetMapping("/oauth2/success")
    public ResponseEntity<AuthenticationResponse> oauth2Success(@AuthenticationPrincipal OAuth2User oauth2User) {
        return ResponseEntity.ok(authenticationService.authenticateWithOAuth2(oauth2User));
    }

    @GetMapping("/logout-success")
    public ResponseEntity<?> logout(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication
    ) {
        ResponseCookie jsessionidCookie = ResponseCookie.from("JSESSIONID", "")
                .path("/")
                .maxAge(0)
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, jsessionidCookie.toString());


        return ResponseEntity.ok().body(Map.of("message", "Logout successful"));
        // Spring Security sẽ tự động xử lý invalidation session và xóa cookies
    }

    //    @PostMapping("/introspect")
//    IntrospectResponse login(@RequestBody IntrospectRequest request) throws ParseException, JOSEException {
//        return authenticationService.introspect(request);
//    }
//    @GetMapping("/logout-success")
//    public ResponseEntity<String> logoutSuccess() {
//        return ResponseEntity.ok("Logout successful");
//    }

}

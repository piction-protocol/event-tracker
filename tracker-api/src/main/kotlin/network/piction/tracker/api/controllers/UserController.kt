package network.piction.tracker.api.controllers

import network.piction.tracker.api.config.UserPrincipal
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/users")
class UserController {

    @GetMapping("/me")
    fun user(@AuthenticationPrincipal principal: UserPrincipal): String {
        return principal.username
    }
}

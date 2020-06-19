package network.piction.tracker.api.controllers

import network.piction.tracker.common.entities.UserEntity
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.web.context.HttpSessionSecurityContextRepository
import org.springframework.web.bind.annotation.*
import java.util.concurrent.TimeUnit
import javax.servlet.http.HttpSession


@RestController
@RequestMapping("/sessions")
class SessionController(val authenticationManager: AuthenticationManager) {

    @PostMapping
    fun create(@RequestBody user: UserEntity, session: HttpSession): String {
        val token = UsernamePasswordAuthenticationToken(user.username, user.password)
        val authentication = authenticationManager.authenticate(token)
        SecurityContextHolder.getContext().authentication = authentication
        session.setAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY,
            SecurityContextHolder.getContext())
        session.maxInactiveInterval = TimeUnit.DAYS.toSeconds(60).toInt()

        return session.id
    }

    @DeleteMapping
    fun delete(session: HttpSession) {
        session.invalidate()
    }
}

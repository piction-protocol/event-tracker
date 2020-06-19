package network.piction.tracker.api.config

import network.piction.tracker.common.entities.UserEntity
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.UserDetails
import java.io.Serializable

class UserPrincipal : UserDetails, Serializable {

    companion object {
        private const val serialVersionUID = 1L
    }

    var id: Long
    private var username: String
    private var password: String
    private var authorities: List<GrantedAuthority> = listOf()

    constructor(user: UserEntity) {
        this.id = user.id!!
        this.username = user.username
        this.password = user.password
        this.authorities = user.authorities.map { SimpleGrantedAuthority(it.name.toString()) }
    }

    override fun getAuthorities(): Collection<GrantedAuthority> = this.authorities

    override fun getUsername() = this.username

    override fun getPassword() = this.password

    override fun isAccountNonExpired() = true

    override fun isAccountNonLocked() = true

    override fun isCredentialsNonExpired() = true

    override fun isEnabled() = true
}

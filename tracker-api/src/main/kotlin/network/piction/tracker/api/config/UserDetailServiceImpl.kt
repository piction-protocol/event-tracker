package network.piction.tracker.api.config

import network.piction.tracker.common.entities.UserEntity
import network.piction.tracker.common.repositories.UserRepository
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service

@Service
class UserDetailServiceImpl(val userRepository: UserRepository) : UserDetailsService {

    @Throws(UsernameNotFoundException::class)
    override fun loadUserByUsername(useranme: String) =
        userRepository.findByUsername(useranme)?.let { createUser(it) }
            ?: throw UsernameNotFoundException("UsernameNotFound [$useranme]")

    private fun createUser(user: UserEntity) = UserPrincipal(user)
}

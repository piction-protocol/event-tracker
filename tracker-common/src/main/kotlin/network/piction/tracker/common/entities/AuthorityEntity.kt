package network.piction.tracker.common.entities

import javax.persistence.*

@Entity
@Table(name = "authorities")
class AuthorityEntity : ParentEntity() {

    enum class AuthorityName { ROLE_ADMIN }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    lateinit var name: AuthorityName
}

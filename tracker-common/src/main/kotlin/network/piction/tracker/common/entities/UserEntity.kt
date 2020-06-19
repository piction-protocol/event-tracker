package network.piction.tracker.common.entities

import javax.persistence.*

@Entity
@Table(name = "users")
class UserEntity : ParentEntity() {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null

    lateinit var username: String

    @Column(columnDefinition = "char(60)", nullable = false)
    lateinit var password: String


    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "users_authorities",
        uniqueConstraints = [UniqueConstraint(columnNames = ["user_id", "authority_id"])],
        joinColumns = [JoinColumn(name = "user_id")],
        inverseForeignKey = ForeignKey(ConstraintMode.NO_CONSTRAINT),
        inverseJoinColumns = [JoinColumn(name = "authority_id")])
    var authorities: MutableList<AuthorityEntity> = arrayListOf()
}

package network.piction.tracker.common.entities

import com.fasterxml.jackson.annotation.JsonIgnore
import javax.persistence.*

@Entity
@Table(name = "contracts")
class ContractEntity : ParentEntity() {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long = 0

    lateinit var name: String

    lateinit var address: String

    lateinit var description: String

    @JsonIgnore
    @OneToMany(mappedBy = "contract", cascade = [CascadeType.ALL], orphanRemoval = true)
    var events: MutableList<EventEntity> = arrayListOf()

    @ManyToOne
    @JoinColumn(name = "user_id")
    lateinit var user: UserEntity
}

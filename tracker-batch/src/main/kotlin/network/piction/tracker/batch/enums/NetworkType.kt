package network.piction.tracker.batch.enums

import com.klaytn.caver.Caver

enum class NetworkType(val url: String) {
    CYPRESS(Caver.MAINNET_URL), BAOBAB(Caver.BAOBAB_URL)
}
package network.piction.tracker.api.extensions

import java.math.BigDecimal
import java.math.RoundingMode
import java.text.DecimalFormat

fun String.cleanDecimalPretty(decimal: Int): String =
    DecimalFormat("###,###.##").format(BigDecimal(this).divide(BigDecimal.valueOf(10).pow(decimal))
        .setScale(2, RoundingMode.DOWN).toDouble())

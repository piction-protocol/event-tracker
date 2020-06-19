pluginManagement {
    repositories {
        gradlePluginPortal()
    }
}

rootProject.name = "event-tracker"
include(":tracker-common", ":tracker-api", ":tracker-batch")

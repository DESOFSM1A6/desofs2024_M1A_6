variable "resource_group_name" {
  description = "The name of the resource group."
}

variable "location" {
  description = "The location of the resources."
}

variable "backendendpointsubnet_id" {
  description = "Database endpoint subnet ID"
}

# variable "dbdnsprivatezone_id" {
#   description = "DB DNS Private Zone ID"
# }

variable "mysql_administrator_login" {
  description = "The administrator login for the MySQL server"
}

variable "mysql_administrator_password" {
  description = "The administrator password for the MySQL server"
}

variable "mysql_server_name" {
  description = "The name of the MySQL server"
}

variable "mysql_database_name" {
  description = "The name of the MySQL database"
}
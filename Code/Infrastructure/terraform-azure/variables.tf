variable "resource_group_name" {
  description = "The name of the resource group."
  default     = "desofsm1a6-rg1"
}

variable "location" {
  description = "The location of the resources."
  default     = "East US"
}

variable "vnet_name" {
  description = "The name of the virtual network."
  default     = "desofsm1a6-vnet1"
}

variable "integrationsubnet_name" {
  description = "The name of the integration subnet."
  default     = "desofsm1a6-integrationsubnet1"
}

variable "integrationsubnet_address_prefixes" {
  description = "The address prefixes for the integration subnet."
  default     = ["10.0.1.0/24"]
}

variable "backendendpointsubnet_name" {
  description = "The name of the backend endpoint subnet."
  default     = "desofsm1a6-backendendpointsubnet1"
}

variable "backendendpointsubnet_address_prefixes" {
  description = "The address prefixes for the backend endpoint subnet."
  default     = ["10.0.2.0/24"]
}

variable "appserviceplan_name" {
  description = "The name of the App Service Plan."
  default     = "desofsm1a6-appserviceplan1"
}

variable "appserviceplan_sku_name" {
  description = "The SKU name of the App Service Plan."
  default     = "B1"
}

variable "appserviceplan_os_type" {
  description = "The operating system type of the App Service Plan."
  default     = "Linux"
}

variable "mysql_administrator_login" {
  description = "The administrator login for the MySQL server"
  default     = "admin1"
}

variable "mysql_administrator_password" {
  description = "The administrator password for the MySQL server"
  default     = "ExamplePassword123!"
}

variable "mysql_server_name" {
  description = "The name of the MySQL server"
  default     = "dbserverdesofsm1a61"
}

variable "mysql_database_name" {
  description = "The name of the MySQL database"
  default     = "databasedbserver"
}

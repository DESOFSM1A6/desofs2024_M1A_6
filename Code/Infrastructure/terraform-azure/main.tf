terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~>3.0"
    }
  }
}

provider "azurerm" {
  features {}
}

module "network" {
  source = "./network"

  resource_group_name                    = var.resource_group_name
  location                               = var.location
  vnet_name                              = var.vnet_name
  integrationsubnet_name                 = var.integrationsubnet_name
  integrationsubnet_address_prefixes     = var.integrationsubnet_address_prefixes
  backendendpointsubnet_name             = var.backendendpointsubnet_name
  backendendpointsubnet_address_prefixes = var.backendendpointsubnet_address_prefixes
}

module "webapp" {
  source = "./webapp"

  resource_group_name          = var.resource_group_name
  location                     = var.location
  appserviceplan_name          = var.appserviceplan_name
  integrationsubnet_id         = module.network.integrationsubnet_id
  backendendpointsubnet_id     = module.network.backendendpointsubnet_id
  mysql_administrator_login    = var.mysql_administrator_login
  mysql_administrator_password = var.mysql_administrator_password
  mysql_server_name            = var.mysql_server_name
  mysql_database_name          = var.mysql_database_name

  depends_on = [
    module.network
  ]
}

module "private_dns" {
  source = "./private-dns"

  resource_group_name      = var.resource_group_name
  location                 = var.location
  backendendpointsubnet_id = module.network.backendendpointsubnet_id
  vnet_id                  = module.network.vnet_id
  backwebapp_id            = module.webapp.backwebapp_id

  depends_on = [
    module.webapp
  ]
}

module "database" {
  source = "./database"

  resource_group_name      = var.resource_group_name
  location                 = var.location
  backendendpointsubnet_id = module.network.backendendpointsubnet_id
  # dbdnsprivatezone_id          = module.private_dns.dbdnsprivatezone_id
  mysql_administrator_login    = var.mysql_administrator_login
  mysql_administrator_password = var.mysql_administrator_password
  mysql_server_name            = var.mysql_server_name
  mysql_database_name          = var.mysql_database_name

  depends_on = [
    module.private_dns
  ]
}

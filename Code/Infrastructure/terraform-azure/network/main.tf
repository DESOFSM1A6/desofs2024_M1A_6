resource "azurerm_resource_group" "rg" {
  name     = var.resource_group_name
  location = var.location
}

resource "azurerm_virtual_network" "vnet" {
  name                = var.vnet_name
  location            = var.location
  resource_group_name = var.resource_group_name
  address_space       = ["10.0.0.0/16"]
  
  depends_on                                = [azurerm_resource_group.rg]
}

resource "azurerm_subnet" "integrationsubnet" {
  name                 = var.integrationsubnet_name
  resource_group_name  = var.resource_group_name
  virtual_network_name = var.vnet_name
  address_prefixes     = var.integrationsubnet_address_prefixes
  delegation {
    name = "delegation"
    service_delegation {
      name = "Microsoft.Web/serverFarms"
    }
  }
  
  depends_on                                = [azurerm_virtual_network.vnet]
}

resource "azurerm_subnet" "backendendpointsubnet" {
  name                                      = var.backendendpointsubnet_name
  resource_group_name                       = var.resource_group_name
  virtual_network_name                      = var.vnet_name
  address_prefixes                          = var.backendendpointsubnet_address_prefixes
  private_endpoint_network_policies_enabled = true
  
  depends_on                                = [azurerm_virtual_network.vnet]
}

resource "azurerm_subnet" "databaseendpointsubnet" {
  name                                      = var.databaseendpointsubnet_name
  resource_group_name                       = var.resource_group_name
  virtual_network_name                      = var.vnet_name
  address_prefixes                          = var.databaseendpointsubnet_address_prefixes
  private_endpoint_network_policies_enabled = true

  delegation {
    name = "dbFlexibleServer"
    service_delegation {
      name    = "Microsoft.DBforMySQL/flexibleServers"
      actions = ["Microsoft.Network/virtualNetworks/subnets/join/action"]
    }
  }
  
  depends_on                                = [azurerm_virtual_network.vnet]
}
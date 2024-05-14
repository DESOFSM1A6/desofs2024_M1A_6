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
  # private_endpoint_network_policies_enabled = true
  service_endpoints    = ["Microsoft.Sql"]
  
  depends_on                                = [azurerm_virtual_network.vnet]
}

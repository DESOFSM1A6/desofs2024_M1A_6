resource "azurerm_private_dns_zone" "dnsprivatezone" {
  name                = "privatelink.azurewebsites.net"
  resource_group_name = var.resource_group_name
}

resource "azurerm_private_dns_zone_virtual_network_link" "dnszonelink" {
  name                  = "desofsm1a6dnszonelink1"
  resource_group_name   = var.resource_group_name
  private_dns_zone_name = azurerm_private_dns_zone.dnsprivatezone.name
  virtual_network_id    = var.vnet_id
}

resource "azurerm_private_endpoint" "privateendpoint" {
  name                = "backwebappprivateendpoint1"
  location            = var.location
  resource_group_name = var.resource_group_name
  subnet_id           = var.backendendpointsubnet_id

  private_dns_zone_group {
    name                 = "privatednszonegroup1"
    private_dns_zone_ids = [azurerm_private_dns_zone.dnsprivatezone.id]
  }

  private_service_connection {
    name                           = "privateendpointconnection1"
    private_connection_resource_id = var.backwebapp_id
    subresource_names              = ["sites"]
    is_manual_connection           = false
  }
}

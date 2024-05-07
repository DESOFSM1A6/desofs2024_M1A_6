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

resource "azurerm_resource_group" "rg" {
  name     = "desofsM1a6-rg"
  location = "westeurope"
}

resource "azurerm_virtual_network" "vnet" {
  name                = "desofsM1a6-vnet"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  address_space       = ["10.0.0.0/16"]
}

resource "azurerm_subnet" "integrationsubnet" {
  name                 = "desofsM1a6-integrationsubnet"
  resource_group_name  = azurerm_resource_group.rg.name
  virtual_network_name = azurerm_virtual_network.vnet.name
  address_prefixes     = ["10.0.1.0/24"]
  delegation {
    name = "delegation"
    service_delegation {
      name = "Microsoft.Web/serverFarms"
    }
  }
}

resource "azurerm_subnet" "backendendpointsubnet" {
  name                                      = "desofsM1a6-backendendpointsubnet"
  resource_group_name                       = azurerm_resource_group.rg.name
  virtual_network_name                      = azurerm_virtual_network.vnet.name
  address_prefixes                          = ["10.0.2.0/24"]
  private_endpoint_network_policies_enabled = true
}

resource "azurerm_subnet" "databaseendpointsubnet" {
  name                                      = "desofsM1a6-databaseendpointsubnet"
  resource_group_name                       = azurerm_resource_group.rg.name
  virtual_network_name                      = azurerm_virtual_network.vnet.name
  address_prefixes                          = ["10.0.3.0/24"]
  private_endpoint_network_policies_enabled = true

  delegation {
    name = "dbFlexibleServer"
    service_delegation {
      name    = "Microsoft.DBforMySQL/flexibleServers"
      actions = ["Microsoft.Network/virtualNetworks/subnets/join/action"]
    }
  }
}

resource "azurerm_service_plan" "appserviceplan" {
  name                = "desofsM1a6-appserviceplan"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  os_type             = "Windows"
  sku_name            = "B1"
}

resource "azurerm_windows_web_app" "frontwebapp" {
  name                = "frontend-desofsM1a06"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  service_plan_id     = azurerm_service_plan.appserviceplan.id

  site_config {
    vnet_route_all_enabled = true
  }
  app_settings = {
    "WEBSITE_DNS_SERVER" : "168.63.129.16"
  }
}

resource "azurerm_app_service_virtual_network_swift_connection" "vnetintegrationconnection" {
  app_service_id = azurerm_windows_web_app.frontwebapp.id
  subnet_id      = azurerm_subnet.integrationsubnet.id
}

resource "azurerm_windows_web_app" "backwebapp" {
  name                = "backend-desofsM1a06"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  service_plan_id     = azurerm_service_plan.appserviceplan.id

  site_config {}
}

resource "azurerm_private_dns_zone" "dnsprivatezone" {
  name                = "privatelink.azurewebsites.net"
  resource_group_name = azurerm_resource_group.rg.name
}

# Confirm
resource "azurerm_private_dns_a_record" "dnsrecord_frontend" {
  name                = "desofsm1a6-dns-frontend"
  zone_name           = azurerm_private_dns_zone.dnsprivatezone.name
  resource_group_name = azurerm_resource_group.rg.name
  ttl                 = 300
  records             = [azurerm_windows_web_app.frontwebapp.name]
}

# Confirm
resource "azurerm_private_dns_a_record" "dnsrecord_backend" {
  name                = "desofsm1a6-dns-backend"
  zone_name           = azurerm_private_dns_zone.dnsprivatezone.name
  resource_group_name = azurerm_resource_group.rg.name
  ttl                 = 300
  records             = [azurerm_windows_web_app.backwebapp.name]
}

resource "azurerm_private_dns_zone_virtual_network_link" "dnszonelink" {
  name                  = "desofsM1a6dnszonelink"
  resource_group_name   = azurerm_resource_group.rg.name
  private_dns_zone_name = azurerm_private_dns_zone.dnsprivatezone.name
  virtual_network_id    = azurerm_virtual_network.vnet.id
}

resource "azurerm_private_endpoint" "privateendpoint" {
  name                = "backwebappprivateendpoint"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  subnet_id           = azurerm_subnet.backendendpointsubnet.id

  private_dns_zone_group {
    name                 = "privatednszonegroup"
    private_dns_zone_ids = [azurerm_private_dns_zone.dnsprivatezone.id]
  }

  private_service_connection {
    name                           = "privateendpointconnection"
    private_connection_resource_id = azurerm_windows_web_app.backwebapp.id
    subresource_names              = ["sites"]
    is_manual_connection           = false
  }
}

# For the database
# 1 - create subnet
# 2 - create private dns zone
# 3 - assign private dns to the vnet
# 4 - create private endpoint to the new vnet

resource "azurerm_private_dns_zone" "dbdnsprivatezone" {
  name                = "dbserver.mysql.database.azure.com"
  resource_group_name = azurerm_resource_group.rg.name
}

resource "azurerm_private_dns_zone_virtual_network_link" "db-dnszonelink" {
  name                  = "dbdesofsM1a6dnszonelink.com"
  resource_group_name   = azurerm_resource_group.rg.name
  private_dns_zone_name = azurerm_private_dns_zone.dbdnsprivatezone.name
  virtual_network_id    = azurerm_virtual_network.vnet.id

  depends_on = [azurerm_subnet.databaseendpointsubnet]
}

resource "azurerm_mysql_flexible_server" "serverMysql" {
  name                         = "dbserverdesofsm1a6"
  location                     = azurerm_resource_group.rg.location
  resource_group_name          = azurerm_resource_group.rg.name
  administrator_login          = "admin1"
  administrator_password       = "adminAdmin1"
  backup_retention_days        = 7
  delegated_subnet_id          = azurerm_subnet.databaseendpointsubnet.id
  geo_redundant_backup_enabled = false
  private_dns_zone_id          = azurerm_private_dns_zone.dbdnsprivatezone.id
  sku_name                     = "GP_Standard_D2ds_v4"
  version                      = "8.0.21"

  high_availability {
    mode = "SameZone"
  }
  maintenance_window {
    day_of_week  = 0
    start_hour   = 8
    start_minute = 0
  }
  storage {
    iops    = 360
    size_gb = 20
  }

  depends_on = [azurerm_private_dns_zone_virtual_network_link.db-dnszonelink]
}

# resource "azurerm_mysql_flexible_database" "databaseMysql" {
#   name                = "databasedbserver"
#   resource_group_name = azurerm_resource_group.rg.name
#   server_name         = azurerm_mysql_flexible_server.serverMysql.name
#   charset             = "utf8mb4"
#   collation           = "utf8mb4_unicode_ci"
# }

# resource "azurerm_private_dns_a_record" "dnsrecord_database" {
#   name                = "database"
#   zone_name           = azurerm_private_dns_zone.dbdnsprivatezone.name
#   resource_group_name = azurerm_resource_group.rg.name
#   ttl                 = 300
#   records             = [azurerm_mysql_flexible_server.serverMysql.name] # has wrong name
# }

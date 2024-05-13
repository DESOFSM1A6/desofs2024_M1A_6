resource "azurerm_mysql_flexible_server" "servermysql" {
  name                         = var.mysql_server_name
  location                     = var.location
  resource_group_name          = var.resource_group_name
  administrator_login          = var.mysql_administrator_login
  administrator_password       = "adminAdmin1"
  backup_retention_days        = 7
  delegated_subnet_id          = var.databaseendpointsubnet_id
  # geo_redundant_backup_enabled = false
  private_dns_zone_id          = var.dbdnsprivatezone_id
  sku_name                     = "GP_Standard_D2ds_v4"
  # version                      = "8.0.21"

  # high_availability {
  #   mode = "SameZone"
  # }
  # maintenance_window {
  #   day_of_week  = 0
  #   start_hour   = 8
  #   start_minute = 0
  # }
  # storage {
  #   iops    = 360
  #   size_gb = 20
  # }

  # depends_on = [azurerm_private_dns_zone_virtual_network_link.db-dnszonelink]
}

resource "azurerm_mysql_flexible_database" "databasemysql" {
  name                = var.mysql_database_name
  resource_group_name = var.resource_group_name
  server_name         = azurerm_mysql_flexible_server.servermysql.name
  charset             = "utf8mb4"
  collation           = "utf8mb4_unicode_ci"

  depends_on = [azurerm_mysql_flexible_server.servermysql]
}
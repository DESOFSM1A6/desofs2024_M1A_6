resource "azurerm_mssql_server" "servermysql" {
  name                         = var.mysql_server_name
  location                     = var.location
  resource_group_name          = var.resource_group_name
  administrator_login          = var.mysql_administrator_login
  administrator_login_password = var.mysql_administrator_password
  version = "12.0"
}

resource "azurerm_mssql_virtual_network_rule" "allow_be"{
  name = "be_sql_vnet_rule"
  server_id = azurerm_mssql_server.servermysql.id
  subnet_id = var.backendendpointsubnet_id

  depends_on = [
    azurerm_mssql_server.servermysql
  ]
}

resource "azurerm_mssql_database" "fg_database"{
  name = "fg-database"
  server_id = azurerm_mssql_server.servermysql.id
}

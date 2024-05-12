resource "azurerm_service_plan" "appserviceplan1" {
  name                = var.appserviceplan_name
  location            = var.location
  resource_group_name = var.resource_group_name
  os_type             = "Linux"
  sku_name            = "B1"
}

resource "azurerm_linux_web_app" "frontwebapp" {
  name                = "frontend-desofsm1a061"
  location            = var.location
  resource_group_name = var.resource_group_name
  service_plan_id     = azurerm_service_plan.appserviceplan1.id

  site_config {
    vnet_route_all_enabled = true
  }
  app_settings = {
    "WEBSITE_DNS_SERVER" : "168.63.129.16"
  }
}

resource "azurerm_linux_web_app" "backwebapp" {
  name                = "backend-desofsm1a061"
  location            = var.location
  resource_group_name = var.resource_group_name
  service_plan_id     = azurerm_service_plan.appserviceplan1.id

  site_config {}
}

resource "azurerm_app_service_virtual_network_swift_connection" "vnetintegrationconnection" {
  app_service_id = azurerm_linux_web_app.frontwebapp.id
  subnet_id      = var.integrationsubnet_id
}
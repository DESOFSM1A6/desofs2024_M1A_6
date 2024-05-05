
# Reference: https://learn.microsoft.com/en-us/azure/app-service/tutorial-secure-ntier-app
# Frontend URL: https://frontend-desofsm1a6.azurewebsites.net/
# Backend URL: https://backend-desofsm1a6.azurewebsites.net/

# TODO: Database integration

# Azure Provider source and version being used
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "=3.0.0"
    }
  }
}

# Configure the Microsoft Azure Provider
provider "azurerm" {
  skip_provider_registration = true # This is only required when the User, Service Principal, or Identity running Terraform lacks the permissions to register Azure Resource Providers.
  features {}
}

# Create a resource group
resource "azurerm_resource_group" "tf_resource_group" {
  name     = "resourceGroup-desofsM1a6"
  location = "West Europe"

  tags = {
    environment = "dev"
  }
}

# Create the Linux App Service Plan
resource "azurerm_service_plan" "appserviceplan" {
  name                = "appServicePlan-desofsM1a6"
  location            = azurerm_resource_group.tf_resource_group.location
  resource_group_name = azurerm_resource_group.tf_resource_group.name
  os_type             = "Linux"
  sku_name            = "S1"
}

# Create the frontend, pass in the App Service Plan ID
resource "azurerm_linux_web_app" "frontend" {
  name                = "frontend-desofsM1a6"
  location            = azurerm_resource_group.tf_resource_group.location
  resource_group_name = azurerm_resource_group.tf_resource_group.name
  service_plan_id     = azurerm_service_plan.appserviceplan.id
  https_only          = true
  site_config {
    minimum_tls_version = "1.2"
  }
}

# Create the backend, pass in the App Service Plan ID
resource "azurerm_linux_web_app" "backend" {
  name                = "backend-desofsM1a6"
  location            = azurerm_resource_group.tf_resource_group.location
  resource_group_name = azurerm_resource_group.tf_resource_group.name
  service_plan_id     = azurerm_service_plan.appserviceplan.id
  https_only          = true
  site_config {
    minimum_tls_version = "1.2"
  }
}

# Create a virtual network within the resource group
resource "azurerm_virtual_network" "tf_virtual_network" {
  name                = "vnet-desofsM1a6"
  resource_group_name = azurerm_resource_group.tf_resource_group.name
  location            = azurerm_resource_group.tf_resource_group.location
  address_space       = ["10.0.0.0/16"]

  tags = {
    environment = "dev"
  }
}

# Create a subnet for the App Service virtual network integration
resource "azurerm_subnet" "vnet_integration_subnet" {
  name                 = "vnetIntegrationSubnet-desofsM1a6"
  virtual_network_name = azurerm_virtual_network.tf_virtual_network.name
  resource_group_name  = azurerm_resource_group.tf_resource_group.name
  address_prefixes     = ["10.0.0.0/24"]

  delegation {
    name = "delegation"
    service_delegation {
      name = "Microsoft.Web/serverFarms"
    }
  }

  enforce_private_link_endpoint_network_policies = false
}

# Create a subnet for the Private Endpoint
resource "azurerm_subnet" "private_endpoint_subnet" {
  name                 = "privateEndpointSubnet-desofsM1a6"
  virtual_network_name = azurerm_virtual_network.tf_virtual_network.name
  resource_group_name  = azurerm_resource_group.tf_resource_group.name
  address_prefixes     = ["10.0.1.0/24"]

  enforce_private_link_endpoint_network_policies = true
}

# Create Private DNS Zone
resource "azurerm_private_dns_zone" "private_dns_zone" {
  name                = "privateLink-desofsM1a6.azurewebsites.net"
  resource_group_name = azurerm_resource_group.tf_resource_group.name
}

# Create a link between private DNS zone and the VNET
resource "azurerm_private_dns_zone_virtual_network_link" "dns_link" {
  name                  = "dnslink-desofsM1a6"
  resource_group_name   = azurerm_resource_group.tf_resource_group.name
  private_dns_zone_name = azurerm_private_dns_zone.private_dns_zone.name
  virtual_network_id    = azurerm_virtual_network.tf_virtual_network.id
  registration_enabled  = true

  depends_on = [azurerm_private_dns_zone.private_dns_zone] # Ensure that the Private DNS zone resource is created first
}

# Create Private Endpoint for the Backend
resource "azurerm_private_endpoint" "backend_endpoint" {
  name                = "backendPrivateEndpoint-desofsM1a6"
  location            = azurerm_resource_group.tf_resource_group.location
  resource_group_name = azurerm_resource_group.tf_resource_group.name

  private_service_connection {
    name                           = "connection-desofsM1a6"
    private_connection_resource_id = azurerm_linux_web_app.backend.id
    subresource_names              = ["sites"]
    is_manual_connection           = false
  }

  subnet_id = azurerm_subnet.private_endpoint_subnet.id

  # Ensure the private endpoint depends on the DNS zone link being created
  depends_on = [azurerm_private_dns_zone_virtual_network_link.dns_link]
}

locals {
  commands = [
    # Enable Virtual Network Integration with the app
    "az webapp vnet-integration add --resource-group ${azurerm_resource_group.tf_resource_group.name} --name ${azurerm_linux_web_app.frontend.name} --vnet ${azurerm_virtual_network.tf_virtual_network.name} --subnet ${azurerm_subnet.vnet_integration_subnet.name}",
    # Enable deployment to back-end web app from internet
    "az webapp update --resource-group ${azurerm_resource_group.tf_resource_group.name} --name ${azurerm_linux_web_app.backend.name} --set publicNetworkAccess=Enabled",
    "az resource update --resource-group ${azurerm_resource_group.tf_resource_group.name} --name ${azurerm_linux_web_app.backend.name} --namespace Microsoft.Web --resource-type sites --set properties.siteConfig.ipSecurityRestrictionsDefaultAction=Deny",
    "az resource update --resource-group ${azurerm_resource_group.tf_resource_group.name} --name ${azurerm_linux_web_app.backend.name} --namespace Microsoft.Web --resource-type sites --set properties.siteConfig.scmIpSecurityRestrictionsDefaultAction=Allow",
    # Lock down FTP and SCM access
    "az resource update --resource-group ${azurerm_resource_group.tf_resource_group.name} --name ftp --namespace Microsoft.Web --resource-type basicPublishingCredentialsPolicies --parent sites/${azurerm_linux_web_app.frontend.name} --set properties.allow=false",
    "az resource update --resource-group ${azurerm_resource_group.tf_resource_group.name} --name ftp --namespace Microsoft.Web --resource-type basicPublishingCredentialsPolicies --parent sites/${azurerm_linux_web_app.backend.name} --set properties.allow=false",
    "az resource update --resource-group ${azurerm_resource_group.tf_resource_group.name} --name scm --namespace Microsoft.Web --resource-type basicPublishingCredentialsPolicies --parent sites/${azurerm_linux_web_app.frontend.name} --set properties.allow=false",
    "az resource update --resource-group ${azurerm_resource_group.tf_resource_group.name} --name scm --namespace Microsoft.Web --resource-type basicPublishingCredentialsPolicies --parent sites/${azurerm_linux_web_app.backend.name} --set properties.allow=false"
  ]
}

resource "null_resource" "commands" {
  count = length(local.commands)

  provisioner "local-exec" {
    command = local.commands[count.index]
  }
}
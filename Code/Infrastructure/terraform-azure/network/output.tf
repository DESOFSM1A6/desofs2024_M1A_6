# outputs.tf

output "vnet_id" {
  description = "The ID of the virtual network."
  value       = azurerm_virtual_network.vnet.id
}

output "integrationsubnet_id" {
  description = "The ID of the integration subnet."
  value       = azurerm_subnet.integrationsubnet.id
}

output "backendendpointsubnet_id" {
  description = "The ID of the backend endpoint subnet."
  value       = azurerm_subnet.backendendpointsubnet.id
}

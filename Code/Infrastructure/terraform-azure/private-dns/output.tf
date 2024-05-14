# outputs.tf

output "dnszonelink_id" {
  description = "The ID of the private DNS zone virtual network link."
  value       = azurerm_private_dns_zone_virtual_network_link.dnszonelink.id
}

# output "db_dnszonelink_id" {
#   description = "The ID of the private DNS zone virtual network link for the database."
#   value       = azurerm_private_dns_zone_virtual_network_link.db-dnszonelink.id
# }

# output "dbdnsprivatezone_id"{
#   description = "DNS private zone ID for the Database"
#   value  = azurerm_private_dns_zone.dbdnsprivatezone.id
# }
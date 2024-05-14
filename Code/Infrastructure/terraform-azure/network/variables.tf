# variables.tf

variable "resource_group_name" {
  description = "The name of the resource group."
}

variable "location" {
  description = "The location of the resources."
}

variable "vnet_name" {
  description = "The name of the virtual network."
}

variable "integrationsubnet_name" {
  description = "The name of the integration subnet."
}

variable "integrationsubnet_address_prefixes" {
  description = "The address prefixes for the integration subnet."
}

variable "backendendpointsubnet_name" {
  description = "The name of the backend endpoint subnet."
}

variable "backendendpointsubnet_address_prefixes" {
  description = "The address prefixes for the backend endpoint subnet."
}

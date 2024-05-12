# variables.tf

variable "resource_group_name" {
  description = "The name of the resource group."
}

variable "location" {
  description = "The location of the resources."
}

variable "appserviceplan_name" {
  description = "Name of the App Service Plan"
}

variable "integrationsubnet_id" {
}
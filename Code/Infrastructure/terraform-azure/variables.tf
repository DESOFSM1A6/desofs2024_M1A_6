variable "resource_group_name" {
  type    = string
  default = "desofsm1a6-rg1"
}

variable "location" {
  type    = string
  default = "westeurope"
}

variable "vnet_name" {
  type    = string
  default = "vnet"
}

variable "subnet_name" {
  type    = string
  default = "subnet"
}

variable "private_ip_address_allocation_name" {
  type    = string
  default = "Dynamic"
}

variable "admin_username" {
  type    = string
  default = "isep12345"
}

variable "admin_password" {
  type      = string
  sensitive = true
  default   = "Isep1234567890"
}

variable "vm_size" {
  type    = string
  default = "Standard_B1s"
}

variable "computer_name" {
  type    = string
  default = "hostname"
}

variable "patch_assessment_mode" {
  type    = string
  default = "AutomaticByPlatform"
}

variable "patch_mode" {
  type      = string
  sensitive = true
  default   = "AutomaticByPlatform"
}

variable "reboot_setting" {
  type    = string
  default = "IfRequired"
}

variable "os_disk" {
  description = "OS disk configuration"
  type = object({
    name                 = string
    caching              = string
    storage_account_type = string
  })

  default = {
    name                 = "myOsDisk"
    caching              = "ReadWrite"
    storage_account_type = "StandardSSD_LRS"
  }
}

variable "source_image_reference" {
  description = "Source image reference configuration"
  type = object({
    publisher = string
    offer     = string
    sku       = string
    version   = string
  })

  default = {
    publisher = "Canonical"
    offer     = "0001-com-ubuntu-server-jammy"
    sku       = "22_04-lts-gen2"
    version   = "latest"
  }
}
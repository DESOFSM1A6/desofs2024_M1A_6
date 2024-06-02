terraform {
  required_providers {
    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "~> 2.0"
    }
  }
}

provider "digitalocean" {
  token = var.do_token
}

data "digitalocean_ssh_key" "all" {
  name = "digitalocean_remoteaccess"
}

resource "digitalocean_droplet" "tfdroplet" {
  image      = "ubuntu-24-04-x64"
  name       = "desofs-droplet-1"
  region     = "lon1"
  size       = "s-1vcpu-2gb-amd"
  monitoring = true
  tags       = ["desofs-prod"]
  ssh_keys   = [data.digitalocean_ssh_key.all.id]

  connection {
    host        = self.ipv4_address
    user        = "root"
    type        = "ssh"
    private_key = file(var.private_key_path)
    timeout     = "2m"
  }

  provisioner "remote-exec" {

    inline = [
      "sudo mkdir -p /usr/src/Code/FE",
      "sudo mkdir -p /usr/src/Code/BE",
      "sudo mkdir -p /usr/src/Code/Infrastructure/docker",
    ]
  }

  provisioner "file" {
    source      = "../../../Code/FE"
    destination = "/usr/src/Code"
  }

  provisioner "file" {
    source      = "../../../Code/BE"
    destination = "/usr/src/Code"
  }

  provisioner "file" {
    source      = "../../../Code/Infrastructure/docker"
    destination = "/usr/src/Code/Infrastructure"
  }

  provisioner "remote-exec" {
    inline = [
      "sudo apt-get update",
      "sudo apt install -y apt-transport-https ca-certificates curl software-properties-common",
      "curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -",
      "sudo add-apt-repository -y 'deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable'",
      "apt-cache policy docker-ce",
      "sudo apt install -y  docker-ce",
      "sudo usermod -aG docker root",

      "sudo curl -L \"https://github.com/docker/compose/releases/download/1.26.0/docker-compose-$(uname -s)-$(uname -m)\" -o /usr/local/bin/docker-compose",
      "sudo chmod +x /usr/local/bin/docker-compose",
      "cd /usr/src/Code/Infrastructure/docker",
      "docker-compose up -d --build"
    ]
  }
}

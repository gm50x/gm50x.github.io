---
layout: post
title: "Ambiente de Desenvolvimento Node no Windows com WSL2"
date: 2021-01-02 10:00:00 -0300
tags: node windows environment
categories: Tutorial Windows
pin: true
---

## Windows Subsystem for Linux

O WSL é uma ferramenta sensacional para desenvolvedores que tem computadores Windows. Ele nos permite ter um kernel linux com o bash e a todas as ferramentas de desenvolvimento do linux no ambiente Windows sem a necessidade de fazer um dual boot, ficar reiniciando o computador para trocar de SO ou qualquer outra gambiarra. A primeira versão da ferramenta era um pouco lenta, mas a versão atual (WSL2) é literalmente um terminal bash dentro do Windows com pouquíssimas restrições.

Para instalar o WSL basta seguir alguns passos conforme as instruções da Microsoft disponíveis [nesse tutorial](https://docs.microsoft.com/pt-br/windows/wsl/install-win10).

Mas resumindo, basta abrir o Powershell em modo administrador e executar esses comandos:
```Powershell
# Habilitar o WSL
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
# Habilitar a Plataforma de Máquina Virtual
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
```

Baixe e instale as [atualizações](https://wslstorestorage.blob.core.windows.net/wslblob/wsl_update_x64.msi) do kernel Linux para o WSL2 da Microsoft e defina o WSL2 como a versão padrão no Powershell.

```Powershell
# Definir o WSL2 como a versão padrão
wsl --set-default-version 2
```

Agora reinicie seu computador e já poderá instalar um terminal para interagir com o Linux de dentro do Windows. Para isso, vá até a Microsoft Store e digite WSL na busca, escolha a sua distro preferida e instale. Sugerimos que intale o Ubuntu 20.04 se não tiver familiaridade com as distribuições Linux.

## VSCode e Build Essential

Caso você não tenha o VSCode instalado no seu computador, baixe a [última versão estável](https://code.visualstudio.com) da Microsoft. Após a instalação do VSCode, entre no terminal de sua preferencia (Ubuntu, Debian, Kali, SUSE, etc...), na primeira vez que você acessar o terminal será preciso criar um usuário e senha de administrador. Após a criação do usuário execute o seguinte comando para instalar o servidor de comunicação entre o VSCode e o WSL.

```bash
code .
```

Para instalar o build-essential vamos utilizar o gerenciador de pacotes da distribuição instalada, no nosso caso utilizamos o Ubuntu 20.04, então o gerenciador é o APT. Mas esse comando varia de distribuição para distribuição. Toda vez que invocarmos o comando SUDO será preciso inserir a senha do seu usuário, esse comando serve para dar as permissões de administrador para execução do comando.

```bash
sudo apt update 
sudo apt get install build-essential
```

O build-essential é uma coleção de bibliotecas utilizadas para compilação de uma série de aplicações, algumas dependências do Node utilizam arquivos desta biblioteca.

## NVM e Node LTS

Vamos instalar também o NVM para gerenciamento das versões do node, ele permite que tenhamos mais de uma versão do Node instalado em nosso ambiente. Para instalar o NVM basta executar o seguinte comando.

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
```

Após a instalação feche e abra novamente o terminal para carregar as novas variáveis de ambiente instaladas pelo nvm. Após o recarregamento você poderá instalar o node com o seguinte comando.

```bash
# (Recomendado) Instalar a versão LTS
nvm install --lts
# (OPICIONAL) Instalar uma versão específica
nvm install 10.22.1
# (OPICIONAL) Trocar a versão utilizada
nvm use 10.22.1
```

Teste a instalação do node.

```bash
node -v
```

Pronto, o ambiente configurado com sucesso! Agora você já pode criar seus projetos de dentro do Terminal linux, digitar code . e seguir com a programação! Vamos fazer um hello world com node? Execute os seguintes comandos para iniciar o projeto.

```bash
cd
mkdir hello-node
touch index.js
npm init -y
code .
```

Agora basta codar...

```bash
const main = () => console.log('Hello Node!')
main()
```
...e rodar!!!
```bash
node index.js
```
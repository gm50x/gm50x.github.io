---
layout: post
title: "Docker para cá, docker para lá. Mas afinal de contas o que é esse tal de docker ai?!"
date: 2020-11-16 09:25:00 -0300
tags: docker introducao iniciante
categories: Docker
pin: true
---

Não se intimide com o Docker, pois é uma ferramenta com curva de aprendizado acentuada. No entanto, quando passar da curva terá em suas mãos uma das melhores ferramentas para o desenvolvimento de suas aplicações. Por isso, não se deixe intimidar, é normal achar tudo muito enigmático quando começamos a trabalhar com esta ferramenta.

![Docker](/assets/img/posts/2020-11-16-docker-cartoon.png)

Vamos começar vendo a sopa de letrinhas, pois há uma série de termos que costumam causar estranheza quando começamos a mexer o Docker.

Docker é uma ferramenta capaz de executar aplicações em ambientes isolados, esses ambientes são chamados de containers. Para executar um aplicação em um container é preciso uma imagem da aplicação, essa imagem é criada com um Dockerfile, um arquivo que descreve o comportamento da aplicação(receitinha de bolo). Existe uma outra ferramenta, chamada docker-compose, utilizada para levantar vários containers de uma só vez(composição), o compose utiliza um arquivo .yml geralmente nomeado como docker-compose.yml para descrever o ambiente inteiro (as várias imagens e a forma que se relacionam). Um container pode ter um volume associado ao host, o host é a máquina que está rodando o Docker e o volume é uma camada de persistência dos dados utilizados ou criados no container armazenados no host. Essa persistência é porque quando você derrubar um container tudo que estiver nele desaparece, então precisamos ter o volume de dados para que esses dados não desapareçam.

Criar o Dockerfile não é suficiente para subir um container com a aplicação, é preciso realizar o build da imagem o que permite que essa imagem seja reutilizada sempre que necessário. É como se você tivesse colocado os ingredientes de um bolo no forno para assar. Uma vez que a imagem já foi construída você poderá reutiliza-la sempre que precisar e é possível compartilhar a imagem em um repositório como o Docker Hub por exemplo, lá existem várias imagens prontas para uso.

![Docker Build](/assets/img/posts/2020-11-16-docker-build.png)

Quer uma dica para aprender Docker? Comece a subir imagens com aplicações simples e de preferência que já conheça o comportamento. Desta forma não terá duas aprendizagens acontecendo ao mesmo tempo, apenas uma. Isso atenua bastante a sua curva de aprendizagem. A sugestão é começar subindo instâncias de bancos de dados, pois são aplicações muito conhecidas e fáceis de interagir.

Quer subir seu primeiro container agora? (É preciso ter instalado o Docker na sua máquina). Execute o seguinte comando no seu terminal (Bash, Zsh, CMD, Powershell)!
```bash
docker run -d -p 5432:5432 --env POSTGRES_PASSWORD=pwd4postgres postgres:alpine
```

Isso fará com que um container com o banco de dados Postgres comece a rodar no seu Docker. Calma que vamos explicar esse monte de coisa ai...

- **docker** é a ferramenta em si;
  run é o comando para executar um container, é tipo o botão start;
- **-d** é usado para que o processo fique em segundo plano, deixando seu terminal disponível para outros comandos.
- **-p** é usado para indicar as portas (de rede) que serão usadas. A sintaxe no docker é sempre host:container. Então nesse caso é a porta-host:porta-container. (Aqui usamos a mesma nos dois). A porta 5432 da sua maquina vai apontar para o container na porta 5432. Você poderia indicar uma outra porta na sua máquina para apontar pro container. Por exemplo se passasse 8000:5432, você acessaria o postgres pela porta 8000 da sua máquina. Cada imagem trabalha com suas próprias portas.
- **--env** é usado para passar algumas variáveis de ambiente para o container. Usamos aqui para colocar a senha do usuário padrão do postgres. Cada imagem possui suas próprias variáveis de ambiente assim como as portas
  postgres:alpine a ultima coisa que estamos passando no comando é a imagem que será utilizada. Aqui estamos usando a imagem postgres na versão alpine. Alpine é uma versão bem pequeninha da aplicação, excelente quando você tem pouco espaço de armazenamento para desperdiçar.

Se quiser acessar o banco de dados pode usar o DBeaver e se conectar como se o banco estivesse rodando na sua máquina. A senha utilizada é pwd4postgres passada na variável de ambiente.

Você também pode querer derrubar o container. Para encerrar a aplicação execute os seguintes comandos.
```bash
# listar containers em execução
docker ps
```
```bash
# parar um container que está em execução
docker container stop infallible_nightingale
```
```bash
# remover um container que está em execução
docker container rm infallible_nightingale
```

- **docker ps** serve para verificar as informações do container rodando (o meu é infallible_nightingale). O docker gera um nome automaticamente se você não passar um durante o docker run.
- **docker container stop <nome_container>** serve para parar o container (derrubá-lo).
- **docker container rm <nome_container>** serve para remover o container totalmente.

Tudo feito. Se você quiser parar e remover o container ao mesmo tempo use o seguinte comando:

```bash
docker container rm infallible_nightingale -f
```
Pronto! Agora você já sabe resumidamente o que é o Docker e como subir uma instância do postgres sem ter que instalar o Postgres na sua máquina.

![Amigos do Docker](/assets/img/posts/2020-11-16-docker-friends.png)
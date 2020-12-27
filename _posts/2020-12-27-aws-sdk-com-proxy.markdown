---
layout: post
title: "Como configurar um proxy autenticado com filtro de User-Agent no AWS-SDK para Node?"
date: 2020-12-27 12:00:00 -0300
tags: node aws-sdk configuracao proxy
categories: Node AWS Tutorial
pin: true
---

<p style="text-align: justify">
Configurar um proxy no aws-sdk pode ser um desafio e tanto se o proxy da sua empresa trabalhar com autenticação e filtro de User-Agent. Quando o proxy faz filtro de User-Agent e os User-Agents configurados no proxy são limitados a alguns poucos e muito específicos, essa configuração precisa ser feita manualmente para poder sobrescrever o User-Agent por algo diferente do padrão.
</p>
<p style="text-align: justify">
Para sobrescrever o User-Agent e realizar a autenticação é preciso utilizar uma biblioteca. A AWS recomenda o uso do pacote proxy-agent, mas não obtivemos sucesso em sobrescrever o User-Agent nessa biblioteca, então vamos utilizar o https-proxy-agent. As duas são do mesmo desenvolvedor. Vamos utilizar como exemplo o User-Agent do Postman.
</p>
<p style="text-align: justify">
Agora chega de papo, vamos logo para o código que interessa!
</p>

```bash
mkdir aws-sdk-with-proxy
cd aws-sdk-with-proxy
npm init -y
npm install aws-sdk https-proxy-agent
touch index.js
```

```javascript
const { S3 } = require('aws-sdk')
const HttpsProxyAgent = require('https-proxy-agent')

const main = () => {
    const agent = HttpsProxyAgent({
        auth: '<ProxyUser>:<ProxyPass>',
        protocol: 'http',
        host: 'meuproxy.meudominio.com.br',
        port: '8080',
        headers: {
            'User-Agent': 'PostmanRuntime/7.26.8'
        }
    })

    const s3 = new S3({
        region: 'us-east-1', httpOptions: { agent }
    })

    const params = { Bucket: 'nome-do-bucket' }
    try {
        s3.listObjects(params, (err, data) => {
            if (!err) {
                console.log('SUCCESS', data)
            } else {
                console.log('ERROR', err)
            }
        })
    } catch (err) {
        console.log(err)
    }
}

main()
```

<p style="text-align: justify">
Não gosta de callbacks, né? Eu também não! Vamos promisificar esse método.
</p>

```javascript
const { S3 } = require('aws-sdk')
const HttpsProxyAgent = require('https-proxy-agent')
const { promisify } = require('util')

const main = async () => {
    const agent = HttpsProxyAgent({
        auth: '<ProxyUser>:<ProxyPass>',
        protocol: 'http',
        host: 'meuproxy.meudominio.com.br',
        port: '8080',
        headers: {
            'User-Agent': 'PostmanRuntime/7.26.8'
        }
    })

    const s3 = new S3({
        region: 'us-east-1', httpOptions: { agent }
    })

    s3.listObjectsAsync = promisify(s3.listObjects.bind(s3))

    const params = { Bucket: 'nome-do-bucket' }
    try {
        const data = await s3.listObjectsAsync(params)
        console.log('SUCCESS', data)
    } catch (err) {
        console.log(err)
    }
}

main()
```
<p style="text-align: justify">
Agora ficou fácil de aplicar essa configuração a qualquer aplicação, seja ela uma CLI, um worker, uma web-api... É preciso manter em mente apenas que o ambiente da aws sem aterações de proxy não precisará dessas configurações. Então, o ideal é aplicar esse ajuste apenas ao ambiente de desenvolvimento.
</p>
# Tutorial Landing Example

Proyecto mínimo (Express + Handlebars) que reproduce la landing que se ve en las capturas. 
Incluye instrucciones básicas para subir a GitHub y desplegar en una instancia EC2 de AWS.

## Instalar localmente

```bash
git clone <your-repo-url.git>
cd tutorial-landing-example
npm install
npm start
# open http://localhost:3000
```

## Estructura de archivos relevantes

```
/public/styles/index.css
/views/layouts/main.handlebars
/views/landing.handlebars
index.js
package.json
.gitignore
```

## Subir a GitHub (comandos básicos)

```bash
git init
git add .
git commit -m "Initial commit - tutorial landing example"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo>.git
git push -u origin main
```

## Desplegar en EC2 (resumen de pasos)

1. Crea una instancia EC2 (Amazon Linux 2 o Ubuntu). Asegúrate de crear o asociar un par de llaves (key pair).
2. En el Security Group de la instancia, añade una regla inbound para permitir el puerto `3000` (o 80 si usarás nginx).
3. Asocia una Elastic IP (desde la consola EC2 -> Elastic IPs) y asigna la IP a tu instancia.
4. Conéctate vía SSH:

```bash
ssh -i "your-key.pem" ubuntu@YOUR_ELASTIC_IP
# o ec2-user@... dependiendo AMI
```

5. En la instancia instala Node.js, npm y git (ejemplo para Ubuntu):

```bash
sudo apt update && sudo apt install -y nodejs npm git
node -v
npm -v
```

6. Clona tu repo, instala dependencias y ejecuta:

```bash
git clone https://github.com/<your-username>/<repo>.git
cd tutorial-landing-example
npm install
# ejecutar en background con pm2 (recomendado)
sudo npm install -g pm2
pm2 start index.js --name tutorial-landing
pm2 save
```

7. Si prefieres exponer la app en el puerto 80, configura nginx como reverse-proxy o ejecuta un proxy. Nginx ejemplo (Ubuntu):

```bash
sudo apt install -y nginx
# configurar /etc/nginx/sites-available/default para proxy_pass http://localhost:3000
# luego
sudo systemctl restart nginx
```

Eso es todo: abre `http://YOUR_ELASTIC_IP` (o el dominio) y deberías ver la landing.


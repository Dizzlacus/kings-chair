FROM nginx:1.27-alpine

COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY index.html terms.html privacy.html favicon.ico favicon.svg /usr/share/nginx/html/
COPY favicon/ /usr/share/nginx/html/favicon/
COPY css/styles.css /usr/share/nginx/html/css/styles.css
COPY js/ /usr/share/nginx/html/js/
COPY images/ /usr/share/nginx/html/images/

EXPOSE 80

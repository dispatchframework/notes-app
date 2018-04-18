FROM nginx:latest

ADD /notes.nginx.conf /etc/nginx/conf.d/default.conf
ADD /.htpasswd /etc/nginx/.htpasswd
ADD /dist /usr/share/nginx/html
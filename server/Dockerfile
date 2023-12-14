FROM nginx:latest as development

RUN rm /etc/nginx/conf.d/default.conf
RUN rm /etc/nginx/nginx.conf

COPY nginx.conf /etc/nginx/nginx.conf
COPY nginx.conf /etc/nginx/conf.d/

EXPOSE 80
EXPOSE 8001

CMD ["nginx", "-g", "daemon off;"]

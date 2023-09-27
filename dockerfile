FROM nginx:alpine
COPY dist/portfolio /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
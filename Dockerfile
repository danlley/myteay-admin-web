#Alpine Linux with a glibc-2.21 and Oracle Java 7
FROM tiancan_nginx


# ------------------------------------------------------------------------------------------
#
#                                     安装微服务应用bmps_web
# docker run -it -p 40211:40211 -v /home/danlley/docker/share/bmps_web/:/var/log/nginx/ -v /etc/localtime:/etc/localtime -d bmps_web_201908042041
#
# ------------------------------------------------------------------------------------------
#安装应用


RUN mkdir -p /etc/tiancan/plateform/
#RUN nginx
#RUN nginx -s quit
ADD nginx.conf /etc/nginx/
ADD dist /etc/tiancan/plateform/bmps_web/

RUN nginx

VOLUME /var/log/nginx

EXPOSE 40211

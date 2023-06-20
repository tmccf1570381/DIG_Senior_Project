#!/bin/bash
cd /var/www/html/
# pm2 start npm --name dig-so-2023-06 
pm2 start npm --name dig-sp-2023-06 -- run server
# pm2 start npm --name dig-sp-2023-06 -- run start

#!/bin/bash
cd /home/ubuntu/outdoormax-ci-cd
{
    pm2 reload outdoormax

} || { 
   pm2 start outdoormax.js
}

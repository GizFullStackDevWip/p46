#!/bin/bash
	CONFIG_PATH="./.env"
	echo Check Below
	echo $CONFIG_PATH
	mkdir config
	echo $PWD
    echo "REACT_APP_PUBID='$REACT_APP_PUBID'" >> $CONFIG_PATH
    echo "REACT_APP_API_URL='$REACT_APP_API_URL'" >> $CONFIG_PATH
    echo "PORT='$PORT'" >> $CONFIG_PATH
    echo "REACT_APP_CHANNELID='$REACT_APP_CHANNELID'" >> $CONFIG_PATH
    echo "APP_ID='$APP_ID'" >> $CONFIG_PATH
    echo "SKIP_PREFLIGHT_CHECK='$SKIP_PREFLIGHT_CHECK'" >> $CONFIG_PATH
    echo "REACT_APP_STRIPE_PK_KEY='$REACT_APP_STRIPE_PK_KEY'" >> $CONFIG_PATH
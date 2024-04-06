#!/bin/sh

# source: https://dev.to/sanjayttg/dynamic-environment-variables-for-dockerized-react-apps-5bc5

# prefix all custom ENV variables to load with "VITE_"

echo "window._env_ = {" >> ./runtime-env.js

for i in $(env | grep VITE_)
do
    key=$(echo $i | cut -d '=' -f 1)
    value=$(echo $i | cut -d '=' -f 2-)

    # TODO: add support for strings with all characters - go over lines, make sure '"' are there for strings
    echo "$key: $value," >> ./runtime-env.js

done

echo "}" >> ./runtime-env.js
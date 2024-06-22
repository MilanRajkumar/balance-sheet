#!/bin/bash

if [[ $1 = "prod"  || $1  = "dev"  || $1 = "test" ]]  &&  [[ $2 = "down"  || $2  = "up" ]]; then
  
  docker_up_or_down=$2
  docker_file="docker/docker-compose.$1.yml"

  cmd="docker compose -f $docker_file $docker_up_or_down"

  if [[ $2 = "up" &&  $1 != "test" ]]; then
   cmd+=" -d"
  fi

  if [[ $2 = "up" ]]; then
   docker build -t frontend_$1 -f ./frontend/Dockerfile.$1 ./frontend
   docker build -t backend -f ./backend/Dockerfile ./backend
  fi
  
  echo "Running $cmd"
  $cmd
else
  echo "Invalid arguments! Follow ./deploy.sh prod|dev|test up|down"
fi
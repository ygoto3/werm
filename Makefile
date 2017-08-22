arch=$(shell uname -s)
redhat_file=/etc/redhat-release

DOCKER_REGISTRY := $(or $(WERM_DOCKER_REGISTRY), gcr.io)
PROJECT_ID := $(WERM_PROJECT_ID)
USER_NAME := $(WERM_USER_NAME)
USER_PASS := $(WERM_USER_PASS)

ifdef WERM_DEVELOPMENT
IMAGE_PULL_POLICY := IfNotPresent
else
IMAGE_PULL_POLICY := Always
endif

.PHONY: start-docker
ifneq ($(wildcard $(redhat_file)),)
start-docker:
	systemctl start docker
else ifeq ($(arch),Darwin)
start-docker:
	@echo Run Docker on your macOS
else
start-docker:
	@echo Your system is not supported, run Docker by yourself
endif

.PHONY: write-deploy
write-deploy:
	cat kubernetes/deploy.yaml.tmpl \
	  | sed -e 's/$${WERM_DOCKER_REGISTRY}/${DOCKER_REGISTRY}/g' \
	  | sed -e 's/$${WERM_PROJECT_ID}/${PROJECT_ID}/g' \
	  | sed -e 's/$${WERM_USER_NAME}/${USER_NAME}/g' \
	  | sed -e 's/$${WERM_USER_PASS}/${USER_PASS}/g' \
	  | sed -e 's/$${WERM_IMAGE_PULL_POLICY}/${IMAGE_PULL_POLICY}/g' \
	  > kubernetes/deploy.yaml \

.PHONY: delete-deploy
delete-deploy:
	rm kubernetes/deploy.yaml

.PHONY: create-deploy
create-deploy:
	$(MAKE) write-deploy
	kubectl create -f kubernetes/deploy.yaml --record
	$(MAKE) delete-deploy

.PHONY: apply-deploy
apply-deploy:
	$(MAKE) write-deploy
	kubectl apply -f kubernetes/deploy.yaml --record
	$(MAKE) delete-deploy

.PHONY: create-svc
create-svc:
	kubectl create -f kubernetes/svc.yaml --record

.PHONY: apply-svc
create-svc:
	kubectl apply -f kubernetes/svc.yaml --record

.PHONY: docker-build
docker-build:
	docker build -t $(DOCKER_REGISTRY)/$(PROJECT_ID)/nginx -f dockerfiles/Dockerfile_nginx .
	docker build -t $(DOCKER_REGISTRY)/$(PROJECT_ID)/web -f dockerfiles/Dockerfile_alpine .

.PHONY: docker-push
docker-push:
	gcloud docker -- push $(DOCKER_REGISTRY)/$(PROJECT_ID)/nginx:latest
	gcloud docker -- push $(DOCKER_REGISTRY)/$(PROJECT_ID)/web:latest

.PHONY: compose-build
build:
	docker-compose build

.PHONY: compose-run
run:
	docker-compose up -d 

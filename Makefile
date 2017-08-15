arch=$(shell uname -s)
redhat_file=/etc/redhat-release


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


.PHONY: build
build:
	docker-compose build


.PHONY: run
run:
	docker-compose up -d 

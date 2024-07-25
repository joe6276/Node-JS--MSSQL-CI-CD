

# How to Build a Backend Pipeline that Deploys a Node APP/ MSSQL Database to An EC2 Instance 

## Continous Intergration (CI)
# Let me explain the commands
### name: CI pipeline 
This is basically the Name of the pipeline 
```ruby
on: 
    push:
        branches:
            - master```

This explains what triggers the workflow: This means this workflow will be triggered only When someone pushes to the Master branch
You can also have other repository and github trigggers          

```ruby
jobs:
    build:
        runs-on: ubuntu-latest
        steps:
            - name: Get Code
              uses: actions/checkout@v4

            - name: Login DockerHub
              env:
                DOCKER_USERNAME: ${{secrets.DOCKER_USERNAME}}
                DOCKER_PASSWORD: ${{secrets.DOCKER_PASSWORD}}
              run: docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD

            - name: Build the Docker Image
              run: docker build -t ndambuki/ci-backend-blogs .
            
            - name: Push to DockerHub
              run: docker push ndambuki/ci-backend-blogs:latest
            
```
### Lets break down the Code:

 ``` ruby 
    runs-on: ubuntu-latest
```
The runner used her is ubuntu-latest runner which one among many runners available . Each runner has some softwares installed so no need to install Node JS because the runner has that.
```ruby
    steps:
```
This specifies the steps to be taken 

```ruby
- name: Get Code
  uses: actions/checkout@v4
```

The above step 1 uses an Existing actions in the MarketPlace . The Action wil Download the Repository Code.

```ruby
- name: Login DockerHub
              env:
                DOCKER_USERNAME: ${{secrets.DOCKER_USERNAME}}
                DOCKER_PASSWORD: ${{secrets.DOCKER_PASSWORD}}
              run: docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD
```

The above Code will login into your DockerHub using the Credential provided.To ensure security we provide them as Secret( once a secret is added it cannot be read )
to give secrets go to a Repository Settings>> Security> Secrets and Variables >> Actions >>  New Repository Secret > Add Key and Value

```ruby
 - name: Build the Docker Image
   run: docker build -t ndambuki/ci-backend-blogs .        
```
This will Build An Image the ubuntu-latest Runner has Docker installed.

```ruby
      - name: Push to DockerHub
        run: docker push ndambuki/ci-backend-blogs:latest
```
This will push the image built into your dockerHub account .




## Continous Deployment (CD)
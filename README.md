# mcrc-repocommit
Microservice is used to do a first commit to new repository from a template.


# Development 
Nodejs10


# Deploy to Google Cloud
`gcloud functions deploy mcrc_repo_first_commit --runtime nodejs10 --trigger-http --project multi-cloud-resource-creation`

# Deploy to AWS Lambda 

Create zip file `zip mcrc_repocommit.zip -r .`
Deploy `aws lambda update-function-code --function-name mcrc-git-repo-first-commit --zip-file fileb://mcrc_repocommit.zip  --region ap-south-1 --debug`
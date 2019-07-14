# Zip Creation
zip mcrc_repocommit.zip -r .
# Deploy
aws lambda update-function-code --function-name mcrc-git-repo-first-commit --zip-file fileb://mcrc_repocommit.zip  --region ap-south-1 --debug
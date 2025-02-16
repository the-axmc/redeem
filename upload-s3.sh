#!/bin/bash
set -e
set -x

# aws s3 sync dist/ s3://wrap.arthera.net --delete --dryrun
aws s3 rm s3://wrap.arthera.net --recursive
aws s3 cp dist/ s3://wrap.arthera.net --recursive
aws cloudfront create-invalidation --distribution-id EX59X4M2OLDUK --paths "/*"
exit

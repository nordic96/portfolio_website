#!/bin/bash
if [[ "$VERCEL_GIT_COMMIT_REF" == "master" || "$VERCEL_GIT_COMMIT_REF" == "develop" || "$VERCEL_GIT_COMMIT_REF" == "prod" ]] ; then
  # Proceed with the build (exit code 1)
  exit 1;
else
  # Don't build (exit code 0)
  exit 0;
fi


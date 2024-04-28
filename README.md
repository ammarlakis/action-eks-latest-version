# EKS Latest Version Action

This action fetches the latest version of AWS EKS.

## Inputs

No inputs required.

## Outputs

### `version`

The latest version of EKS.

## Example usage

```yaml
name: Check EKS Updates

on:
  push:
    branches:
      - master
  schedule:
    - cron: '0 0 * * *'

env:
  CURRENT_VERSION=1.24

jobs:
  check-version:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout repository
      uses: actions/checkout@v4

    - name: Fetch Latest EKS Version
      id: eks-version
      uses: ammalakis/action-eks-latest-version@master

    - name: Compare EKS Version to 1.24
      run: |
        if [ "$CURRENT_VERSION" = "${{ steps.eks-version.outputs.version }}" ]; then
          echo "EKS is Up-to-date."
        else
          echo "A new update is available for EKS."
        fi
```

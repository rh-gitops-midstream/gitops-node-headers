# gitops-node-headers

Node.js 18 native headers

Retrieve and installed using node-gyp and the rhacm yarn builder based on nodejs 18:

```
docker run -ti registry-proxy.engineering.redhat.com/rh-osbs/rhacm2-yarn-builder:rhel_8_nodejs_18_yarn_builder bash

dnf install -y git make python39
npm install -g node-gyp
git clone https://github.com/argoproj/argo-cd.git
cd argo-cd/ui
yarn install
cat > binding.gyp << EOF
{
  "targets": [
    {
      "target_name": "binding",
      "sources": [ "src/" ]
    }
  ]
}
EOF
node-gyp configure
node-gyp install
node-gyp list --verbose
cd ../../
git clone https://github.com/rh-gitops-midstream/gitops-node-headers.git
cd gitops-node-headers
git checkout -b $(node --version)-v1.x
cp -fr /root/.cache/node-gyp/$(node --version | tr -d v) .
cp -fr ../argo-cd/ui/node_modules .
git add -A
git commit -m "Headers and node_modules files"
```



# npm
## npm依赖包批量上传
:::tip
先放上集成好命令的sh脚本，放在项目 **package.json** 同级目录中执行，就可以自动下载并批量上传依赖包了

[tgz.sh](http://43.142.165.147:7000/tgz.sh) 
:::

我们经常会遇到在内网环境需要批量上传依赖包的情况，下面就给大家介绍如何方便快速的上传依赖包

首先我们在项目根目录内下载当前项目的依赖包
```:no-line-numbers
npm install
```
这时会生成对应的 **node_modules** 文件夹及 **package-lock.json** 文件

接下来我们需要全局安装 **node-tgz-downloader**
```:no-line-numbers
npm install node-tgz-downloader -g
```
这个插件主要是方便我们从对应的package.json或package-lock.json中提取下载对应的tgz文件

这里我们从 **package-lock.json** 中下载对应的.tgz，在当前项目根目录中运行：
```:no-line-numbers
download-tgz package-lock package-lock.json
```
:::tip 
当依赖包下载量过大时可能会提示下载失败，这是有的镜像仓库服务端做了限制，可切换npm源后再次尝试
:::
下载完成后，当前目录会生成一个 **tarballs** 文件夹，文件夹内结构与 **node_modules** 类似，只是每个包内不再是具体文件，而是.tgz文件

之后我们需要将 **tarballs** 文件夹内的.tgz文件全部提取出来放入单独的目录内，方便我们之后批量上传

新建一个 **tgz** 文件夹
```sh:no-line-numbers
mkdir tgz
```
用命令将 **tarballs** 文件夹的所有.tgz文件移动到 **tgz** 文件夹下
```sh:no-line-numbers
find ./tarballs -name "*.tgz" | xargs -I {} mv -f {} ./tgz
```
最后再通过命令进行批量上传
```sh:no-line-numbers
cd tgz/
# registry替换成自己的依赖库
find . -type f -name "*.tgz"  | sed "s|^\./||" | xargs -I '{}' npm publish -registry=http://xx.xx.xx.x/repository/npm-hosted/ {}  2>&1 | tee -a npm.log
```
:::tip
第一次上传依赖库一般会报401错误，需要进行登录操作，可执行以下命令进行登录：
:::
```:no-line-numbers
npm login -registry=http://xx.xx.xx.x/repository/npm-hosted/ 
```
:::tip
上传过程中可能会报400错误，这一般是当前上传的包仓库已存在导致的, 不会影响其他包的上传
:::

# npm
## npm依赖包发布使用

### 发布

创建一个空文件夹
```:no-line-numbers
mkdir myNpmDemo
```

初始化项目
```:no-line-numbers
cd myNpmDemo
npm init
```

这时会提示你初始化一些必要的package.json信息

* name: 包名，后续在npm中搜索全靠它，**跟项目名字没有关系**
* version：版本号，每发布一次npm包就要增加一个版本，每个版本不能重复
* description：描述
* main: 本包向外暴露的文件
* private: true/false 是否为私有
* keywords: npm检索的关键字
* author: 作者
* license: ISC

创建模块加载时的文件，例如我们在 **项目根目录** 下创建 `index.js`

```js
const npmDemo = {
  sayHello(){
    console.log('hello npm')
  }
}
export default npmDemo
```

至此，一个简单的待发布的npm包就创建好了，下面来看怎么发布

:::tip
第一次上传依赖库需要进行登录操作，可执行以下命令进行登录：
:::
```:no-line-numbers
npm login -registry=http://xx.xx.xx.xxx:xxxx/repository/npm-hosted/ 
```

运行下面的命令，验证是否登录成功

```:no-line-numbers
npm whoami
```

能正常出现用户名说明登录成功，执行发布命令

```:no-line-numbers
npm publish -registry=http://xx.xx.xx.xxx:xxxx/repository/npm-hosted/
```

:::tip
当出现 `+ 你的文件名@version` 时，说明发布成功
:::

### 使用

发布成功后我们就可以尝试下载使用我们刚发布的npm包了，首先进入需要使用npm包的项目，在项目根目录下创建`.npmrc`文件

```:no-line-numbers
touch .npmrc
```

在文件内写入你自己的npm仓库地址
```js
registry = http://xx.xx.xx.xxx:xxxx/repository/npm-group/
```

执行命令安装刚发布的依赖

```:no-line-numbers
npm install yournpmname -S
```
:::tip
安装成功后在项目 `package.json` 中会出现相关依赖的信息，可以进行查看检查
:::

最后在需要使用的功能内引入当前npm进行使用

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

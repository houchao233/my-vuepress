# git常用命令

## init && clone

`git init` 在当前目录新建一个仓库

`git init [project-name]` 在一个目录下新建本地仓库

`git clone [url]` 克隆一个远程仓库

## status

`git status [file-name]` 查看指定文件状态

`git status` 查看所有文件状态

## add

`git add [file-name1] [file-name2] ...` 从工作区添加指定文件到暂存区

`git add .` 将工作区的被修改的文件和新增的文件提交到暂存区，不包括被删除的文件

`git add -u .` u指update，将工作区的被修改的文件和被删除的文件提交到暂存区，不包括新增的文件

`git add -A .` A指all，将工作区被修改、被删除、新增的文件都提交到暂存区

## commit

`git commit -m [massage]` 将暂存区所有文件添加到本地仓库

`git commit [file-name-1] [file-name-2] -m [massage]` 将暂存区指定文件添加到本地仓库

`git commit -am [massage]` 将工作区的内容直接加入本地仓库

`git commit --amend` 快速将当前文件修改合并到最新的commit，不会产生新的commit。在提交commit后发现还有部分文件修改忘记提交了可以是用该命令

加`-m`是指直接在后面写上版本的注释，不加`-m`的话会用一个vim打开文件让你写入massage，有未追踪的文件将会失败，需要add加入暂存区。

## pull

`git pull` 从远程仓库拉取代码到工作空间

## push

`git push` 将文件添加到远程仓库

`git push -f` 强制提交，当我们本地reset到旧的版本时，然后普通push会被拦截，因为此时本地HEAD指向比远程库还要旧

`git push origin [branch-name]` 推送当前本地分支到指定远程分支

## checkout

`git checkout [branch]` 切换分支

`git checkout -b [new-branch-name]` 创建并切换分支

## merge

`git merge` 合并本地`origin/[branch-name]`和`HEAD->[branch-name]`的代码，并同步到工作空间

`git merge [branch-name]` 用于合并指定分支到当前分支

`git merge --quit` 退出当前分支合并，当合并后冲突很多，要撤回合并分支就可以用这个命令

`git merge --abort` 该命令仅仅在合并后导致冲突时才使用。git merge --abort将会抛弃合并过程并且尝试重建合并前的状态。

## branch

`git branch [branch-name]` 创建分支

`git branch` 查看当前分支

`git branch -a` 查看本地和远程的所有分支

`git branch -r` 查看远程所有分支

`git branch -d [branch-name]` 删除一个分支

`git branch -D [branch-name]` 强制删除一个没有合并的分支

`git branch --set-upstream-to=origin/[branch-name] [branch-name]` 把本地分支和远程分支进行连接

## clean

`git clean -df` 加`-d`是指包含目录，加`-f`是指强制，删除所有未跟踪的文件

## log

`git log` 显示所有commit日志

`git log --pretty=oneline` 将日志缩写为单行显示

`git log --graph --pretty=oneline --abbrev-commit` 查看分支合并情况

`git log --oneline --decorate --graph --all` 查看分叉历史，包括：提交历史、各个分支的指向以及项目的分支分叉情况。

`git log -3` 查看最新3条commit日志数据

## reflog

`git reflog` 显示操作本地版本库的命令，包括commit和reset等，在回退版本以后又后悔找不到commit id了可以使用此命令查看历史

## rm

`git rm --cached [file-name]` 删除暂存区的文件

`git rm -rf .` 不但删除所有暂存区的文件，还删除所有工作区的物理文件

## reset

**当对整个版本进行操作**

`git reset --{soft|(mixed)|hard} HEAD`

*   `--soft` 其中可选参数soft表示单纯的切换HEAD指向的commit-id

*   `--mixed` 默认值mixed参数表示先执行上面一步，然后再将commit-id里面的内容更新到暂存区

*   `--hard` hard表示先执行上面两步，然后再将暂存区内容同步到工作区

`git reset --hard HEAD^^` 用上两个版本里的所有文件撤回到暂工作区

`git reset --hard [commit id]` 用指定版本的所有文件撤回到工作区

**当对当个文件进行操作**

`git reset HEAD [file-name]`

*   对单个文件操作时候只能用mixed参数，而且还是可省略
*   对单个文件操作时候HEAD指向不会变
*   将commit中指定的文件同步到暂存区中

`git reset [commit-id] [file-name]` 将指定commit-id中的文件替换掉暂存区的文件

**切换分支的比较**

`git reset [branch]` 切换分支，但这里的切换分支和上面的`git checkout [branch]`切换分支不同。

## revert

`git revert -n [commit-id]`

`git revert -n HEAD^^`

:::tip
**撤回版本的比较**

***reset*** 切换版本是会删除丢弃最新的版本的，HEAD会直接跳到指定版本，但是还是可以通过reflog找回。

***revert*** 会将指定的bug版本视为bug版，会将当前版本中的bug版的代码删除，生成新的commit覆盖掉当前commit，但是commit-id是不会变的。
:::

## switch

`git switch -c [branch-name]` 创建新分支并切换到该分支

`git switch [branch-name]` 切换到已有分支

:::tip
`git switch` 和 `git checkout` 在切换分支的作用上是相似的，但 `git checkout` 其他功能性方面更强一些
:::

## stash

> 用于暂存当前修改的文件

如果不隐藏自己修改的半成品代码，就会发生切换到别的分支后，将然后自己的半成品代码带入其他分支，这样就发生很多不必要的麻烦。


`git stash` 隐藏当前工作的修改

`git stash save message` 执行存储时，添加备注，方便查找，只有git stash 也要可以的，但查找时不方便识别。

`git stash list` 查看隐藏的工作信息列表

`git stash drop` 删除隐藏的工作信息

`git stash pop` 应用最近一次暂存的修改，并删除暂存的记录

`git stash apply` 恢复指定的隐藏工作信息，但是不会删除隐藏的工作信息，如果要使用其他个，默认使用第一个存储，即 stash@{0}，如果要使用其他个，git stash apply stash@{$num}  。

`git stash clear` 删除所有缓存的 stash


## remote

`git remote add origin 远程地址` 关联远程仓库

`git remote` 查看本地添加了哪些远程分支地址

`git remote -v` 查看本地添加了哪些远程分支地址更详细信息

`git remote remove origin` 删除本地指定的远程地址

## fetch

`git fetch` 拉取远程分支最新的commit到本地仓库的`origin/[branch-name]`

`git fetch` 命令通常用来查看其他人的进程，操作仅仅只会拉取远程的更改，不会自动进行 merge 操作。对你当前的代码没有影响

:::tip
**pull 和 fetch的关系**

`git pull` == `git fetch` + `git merge`
:::
## tag

`git tag` 查看所有标签

`git tag [version]` 给当前最新的commit打上标签

`git tag [version] [commit-id]` 给指定的commit-id打上标签

`git tag -a [version] -m [massage] [commit-id]` 给指定的commit-id打上标签并附上说明文字

`git tag -d [version]` 删除标签

## show

`git show [tag-name]` 查看标签的详细信息

## cherry-pick

`git cherry-pick [commit-hash]` 这个是复制一次commit提交，然后在当前分支上重新提交一遍；也就是将指定commit的合并到当前分支；

commit-hash 表示的是某次 commit 的 hash 值。

:::tip
适用于想把其他分支上指定提交合并到当前分支上
:::

## rebase
`git rebase [branch-name]` 将当前分支变基到[branch-name]目标分支

>张三从master的提交B拉了分支进行开发，目前提交了两次，开发到D了；李四也从B拉出来开发了并且开发完毕，他提交了M，然后合到master上了。此时张三想拉下最新代码，于是他在feature分支上执行了git rebase master，即把master分支给rebase过来，由于李四更早开发完并合了主干，如此就相当于张三是基于李四的最新提交M进行的开发了。
[参考](https://juejin.cn/post/7103560564466515981)

:::tip
这时可能需要执行 `git push -f origin 当前分支` 对当前分支进行强行推送
:::

`git rebase -i HEAD~2` 通过vim对提交进行相关操作，HEAD~2代表选择离HEAD最近的两条提交。

> 在git push之前，可以通过当前命令对本地分支的提交进行提交合并、提交信息修改等操作，使得推送到远端的git日志更清晰明了。
[参考](https://blog.csdn.net/the_power/article/details/104651772/)

`git rebase --continue` 继续变基

在 rebase 的过程中，也许会出现冲突。在这种情况，git 会停止 rebase 并会让你去解决冲突。在解决完冲突后，用`git add`命令去更新这些内容，之后用`git rebase --continue`继续变基剩下的。

`git rebase —abort` 取消变基，分支会回到 rebase 开始前的状态。


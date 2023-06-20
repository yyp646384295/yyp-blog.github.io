# Git
git的基本命令使用与遇到的问题解决

## 基本操作

```shell
# 查看分支
git branch -a

# 查看当前分支
git branch

## 查看远程分支
git branch -r

# 切换分支
git checkout develop

## 创建新分支并切换新分支
git checkout -b '分支名'

## 合并分支 将名称为[name]的分支和当前分支合并
git merge [name] 

# 拉取远程分支
git fetch origin develop

# 查看邮箱
git config user.email

# 查看用户名
git config user.name

# 更换git地址
git remote set-url origin 'git address'
git push origin --all

## 删除本地指定的远程地址
git remote -v
git remote remove '删除的分支名'

## 设置项目的用户名密码
cd 'project address'
git config credential.helper store
git pull 
输入用户名密码

## 把本地的某个分支test提交到远程仓库，并作为远程仓库的master分支，或者作为另外一个名叫test的分支
git push origin test:master
git push origin test:test

# stash
git stash list查看储存哪些文件
git stash pop ：命令恢复之前缓存的工作目录

```



## 推送

```markdown
1. 初始化仓库
git init

2. 关联远程仓库
git remote add origin 'git address'

3. 暂存所有本地修改文件
git add .

4. 提交
git commit -m 'log'

5. 推送到 master 分支
git push -u origin master/main

6. 强制推送，谨慎使用，会覆盖
git push -f origin master
```



## 回退版本

```shell
# 查看最近3次提交的历史版本
git log -3

# 回退到上一版本
git reset --haed '复制上一版本号' into master

# 在进行pull更新分支
git pull origin master
```



## 解决拉取推送重复输入密码

```shell
git config --global credential.helper store
```



## 回退版本，并移除提交记录

```shell
git log

git reset --hard 提交id

git push -f origin master
```


## 提交
```js
feat: //新特性，新功能
fix: //修改bug
docs: //文档修改
style: //代码格式修改，注意不是css修改
refactor: //代码重构
perf: //代码优化，比如提升性能，体验
test: //测试用例修改
chore: //其他修改，比如改变构建流程，或者增加依赖库，工具等
revert: //回滚上一个版本
build: //编译相关修改，例如：发布版本，对项目构建或者依赖的改动
```



## 遇到的错误

### git 遇到 # Please enter a commit message to explain why this merge is necessary

> 解决：
>
> 1. 按 **i** 键进入insert模式
     >
     > 			2. 按 **ESC** 键
     > 			2. 输入 **:wq**，注意是冒号+w与q，然后回车即可



### git 报错 :error: You have not concluded your merge (MERGE_HEAD exists)

> 如果你没做任何修改，或者本地新的变更删了就删了无所谓
>
> 解决：
> git fetch --all
> git reset --hard origin/master
> git fetch

>
> 如果本地更改的文件很重要，那么其实就是要重新合并
>
> 解决
> git merge --abort
> git reset --merge
> git pull

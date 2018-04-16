# htm-cre

移动端html页面开发初始化脚手架

## 安装

```shell
npm install -g htm-cre
```

## 使用

### 新建项目

```shell
cre init
```

参数说明：
```shell
  -n, --name [name]         项目名
```

创建完毕项目后，进入项目根目录`npm install`安装依赖，即可开始开发

## 现有功能

### sass编译/样式补全

```shell
npm run cssW
```
监控`scss`文件夹中的scss文件，编译到`css`文件夹,实时调整页面内容


### 打包项目

```shell
npm run publish
```
输入页面打包到publish中，防止缓存加入hash值

## 说明


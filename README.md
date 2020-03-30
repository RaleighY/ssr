## 项目结构

lang: Typescript

Client：react, react-router,

Sever: koa，tsnode

中间件：

- koa-router
- koa-static

样式: styled-components

## Todo

- SSR 开发环境的 Styled-Component 的调试插件，由于使用的 tsnd，没有经过 loader 的插件，看不到类名
- webpack-manifest-plugin

## Lint

### tsconfig

### tslint

### commitlint

### prettier

## Docker

通过自定义 dockerfile 创建镜像

- -t 指定镜像名
- -f 指定 dockerfile 路径

```
docker build ./ -t ssr -f docker/dockerfile
```

展示所有的镜像

```
docker images
```

通过镜像创建一个容器

```
docker run -d -p 3030:8080 ssr
```

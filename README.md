
# fastify-aws


### 安装

```shell
npm i --save @kne/fastify-aws
```


### 概述

### 项目概述

`fastify-aws` 是一个基于 Fastify 框架的插件，用于集成 AWS 服务。目前支持以下功能：

1. **OSS (对象存储服务)**：
   - 文件上传（通过文件路径或流）。
   - 文件下载。
   - 获取文件流。
   - 生成预签名 URL。

2. **SES (简单邮件服务)**：
   - 发送电子邮件。

### 技术栈

- **Fastify**：高性能 Node.js 框架。
- **AWS SDK**：用于与 AWS 服务交互。
- **Nodemailer**：用于发送电子邮件。

### 配置要求

- 需要提供 AWS 凭证（`accessKeyId` 和 `secretAccessKey`）。
- 需要配置 OSS 存储桶名称和区域。
- 需要配置 SES 区域（可选）。

### 示例

#### 示例代码



### API

### OSS 服务

| 方法名                | 描述           | 参数                                       | 返回值                               |
|--------------------|--------------|------------------------------------------|-----------------------------------|
| `createClient`     | 创建 S3 客户端实例  | 无                                        | `S3Client` 实例                     |
| `uploadFile`       | 上传文件到 S3     | `{ file: string, filename: string }`     | `Promise<PutObjectCommandOutput>` |
| `uploadFileStream` | 通过流上传文件到 S3  | `{ stream: Readable, filename: string }` | `Promise<PutObjectCommandOutput>` |
| `downloadFile`     | 从 S3 下载文件    | `{ filename: string }`                   | `Promise<Readable>`               |
| `getFileStream`    | 获取文件的流       | `{ filename: string }`                   | `Promise<Readable>`               |
| `getFileLink`      | 生成文件的预签名 URL | `{ filename: string, expires: number }`  | `Promise<string>`                 |

### SES 服务

| 方法名        | 描述     | 参数                         | 返回值                        |
|------------|--------|----------------------------|----------------------------|
| `sendMail` | 发送电子邮件 | `mailOptions: MailOptions` | `Promise<SentMessageInfo>` |

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
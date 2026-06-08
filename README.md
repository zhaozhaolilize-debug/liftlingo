# Fit with Zhao 🏋️ · 赵赵的健身英语手册

边健身 · 边学英语

## 本地运行

```bash
npm install
npm run dev
```

## 部署到 Cloudflare Pages

1. 把这个文件夹上传到 GitHub 新仓库（比如 `fit-with-zhao`）
2. 打开 Cloudflare Pages → Create a project → Connect to Git
3. 选择仓库，填写构建配置：
   - **Framework preset**: Vite
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
4. 点击 Save and Deploy
5. 部署完成后 Cloudflare 会给一个链接，手机直接打开

## 项目结构

```
fit-with-zhao/
├── index.html          # 入口 HTML
├── package.json        # 依赖配置
├── vite.config.js      # Vite 配置
└── src/
    ├── main.jsx        # React 挂载入口
    └── App.jsx         # 主应用（所有功能在这里）
```

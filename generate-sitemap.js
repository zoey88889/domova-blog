const fs = require("fs");
const path = require("path");

const BASE_URL = "https://domova.netlify.app"; // ✅ 你的根域名
const FOLDERS = ["./", "./vols", "./neighborhoods", "./news"]; // ✅ 扫描这些文件夹生成链接

function getHtmlFiles(dirPath) {
  const files = fs.readdirSync(dirPath);
  return files
    .filter(file => file.endsWith(".html"))
    .map(file => {
      const relPath = path.relative(".", path.join(dirPath, file)).replace(/\\/g, "/");
      return `${BASE_URL}/${relPath}`;
    });
}

const urls = FOLDERS.flatMap(folder => getHtmlFiles(folder));

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url><loc>${url}</loc></url>`).join("\n")}
</urlset>`;

fs.writeFileSync("sitemap.xml", sitemap);

console.log(`✅ 已生成 sitemap.xml，共收录 ${urls.length} 个页面`);
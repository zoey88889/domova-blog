// inject-footer.js

const fs = require("fs");
const path = require("path");

// ✅ 要替换 footer 的 HTML 文件夹（可自行添加更多路径）
const TARGET_FOLDERS = ["./", "./neighborhoods", "./vols", "./news", "./price", "./tax"];

// ✅ 替换目标：识别旧 footer 或 <footer> 标签并替换
const FOOTER_PLACEHOLDER = `
<div id="footer"></div>
<script>
  fetch("/components/footer.html")
    .then(res => res.text())
    .then(html => {
      document.getElementById("footer").innerHTML = html;
    });
</script>
`;

// ✅ 替换所有 HTML 文件中的 <footer> 标签或尾部，插入统一 footer
function processFile(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");

  // 移除旧的 <footer> 段（如果存在）
  const cleaned = content.replace(/<footer[\s\S]*?<\/footer>/gi, "");

  // 插入统一 footer（放在 </body> 前）
  const updated = cleaned.replace(/<\/body>/i, `${FOOTER_PLACEHOLDER}\n</body>`);

  fs.writeFileSync(filePath, updated, "utf-8");
  console.log(`✅ 已更新: ${filePath}`);
}

// ✅ 遍历所有文件夹并处理 HTML 文件
TARGET_FOLDERS.forEach(folder => {
  const files = fs.readdirSync(folder);

  files.forEach(file => {
    if (file.endsWith(".html")) {
      const fullPath = path.join(folder, file);
      processFile(fullPath);
    }
  });
});

console.log("\n🎉 所有页面已成功插入统一 footer！");

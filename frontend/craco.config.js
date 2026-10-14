// Configuração portátil (sem o editor/overlay privado do Emergent).
const path = require("path");
module.exports = {
  webpack: { alias: { "@": path.resolve(__dirname, "src") } },
};

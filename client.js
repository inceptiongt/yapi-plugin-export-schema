function exportData(exportDataModule, pid) {
  exportDataModule.docx = {
    name: 'schema',
    route: `/api/plugin/exportSchema?type=schema&pid=${pid}`,
    desc: '导出项目接口文档的schema',
  };
}

module.exports = function () {
  this.bindHook('export_data', exportData);
};

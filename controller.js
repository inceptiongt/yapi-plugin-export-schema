/* eslint-disable */
const baseController = require('controllers/base.js');
const interfaceModel = require('models/interface.js');
const projectModel = require('models/project.js');
const interfaceCatModel = require('models/interfaceCat.js');
const logModel = require('models/log.js');
const yapi = require('yapi.js');
// const toDocx = require('./json2docx');
const toZip = require('./generationZip')
/* eslint-enable */

class exportController extends baseController {
  constructor(ctx) {
    super(ctx);
    this.catModel = yapi.getInst(interfaceCatModel);
    this.interModel = yapi.getInst(interfaceModel);
    this.projectModel = yapi.getInst(projectModel);
    this.logModel = yapi.getInst(logModel);
  }

  async handleListClass(pid, status) {
    const result = await this.catModel.list(pid);
    const newResult = [];
    for (let i = 0, item, list; i < result.length; i += 1) {
      item = result[i].toObject();
      list = await this.interModel.listByInterStatus(item._id, status);
      list = list.sort((a, b) => a.index - b.index);
      if (list.length > 0) {
        item.list = list;
        newResult.push(item);
      }
    }

    return newResult;
  }

  async exportData(ctx) {
    const { pid } = ctx.request.query;
    const { status } = ctx.request.query;

    if (!pid) {
      ctx.body = yapi.commons.resReturn(null, 200, 'pid 不为空');
    }
    let curProject;
    try {
      curProject = await this.projectModel.get(pid);
      ctx.set('Content-Type', 'application/octet-stream');
      const list = await this.handleListClass(pid, status);
      ctx.set('Content-Disposition', `attachment; filename=${encodeURI(`${curProject.name}接口schema`)}.zip`);
      const rst = toZip(list);
      // const rst = data;
      return (ctx.body = rst);
    } catch (error) {
      yapi.commons.log(error, 'error');
      ctx.body = yapi.commons.resReturn(null, 502, '下载出错');
    }
  }
}

module.exports = exportController;

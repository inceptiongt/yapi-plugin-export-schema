# yapi-plugin-export-schema

Yapi平台插件，导出接口jsonschema数据为json文件

## 目的

得到接口的schema数据，保存为json文件，用于java后端生成与接口对应的VO实体类（可使用[jsonschema2pojo](https://github.com/joelittlejohn/jsonschema2pojo)）

## 方案

导出接口的json-schema数据，一个接口分为两个文件————req_schema.json/res_schema.json，所有文件归档为zip文件

## 使用

作为Yapi平台插件，添加后在平台”项目“->”数据管理“->”数据导出”->"schema"
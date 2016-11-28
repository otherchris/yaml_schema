/* eslint no-undef: "off" */

import chai from 'chai';

import YamlSchema from './YamlSchema';
import { OrderLinesConfig } from '../OrderLines/schema';
import { endpoints } from '../OrderLines/endpoints';

describe('Make a yaml', () => {
  const ymlSchema = new YamlSchema(OrderLinesConfig);
  const ymlParams = new YamlSchema(endpoints.orderLines.post);
  it('Makes a yaml', () => {
    console.log(ymlSchema.toYaml(0));
  });
  it('Makes a param', () => {
    console.log(ymlParams.toParams(0));
  });
});

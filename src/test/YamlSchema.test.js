/* eslint no-undef: "off" */

import { expect } from 'chai';

import { writeYamlSchema,
  delLast,
  lastLine,
  writeParams,
} from '../YamlSchema';
import { OrderLinesConfig } from '../data/schema';

const schemaResult = `OrderLines:
  type: object
  properties:
    type:
      type: integer
      enum: [2, 3]
      description: 2=reject, 3=approve
    orderLineId:
      type: string
      format: date
      description: orderLineId
    oLineId:
      type: array
      items:
        type: string
        format: date
      description: orderLineId
    message:
      type: string
      description: Optional message to send with review
    status:
      type: integer
      enum: ['one', 'shoe']
      description: No description provided
      additionalProperties:
        type: string
    cpm:
      type: number
      description: Cost per mil
    campaign:
      type: object
      properties:
        orderLineId:
          type: string
          format: date
          description: orderLineId
        oLineId:
          type: array
          items:
            type: string
            format: date
          description: orderLineId
      description: Parent Campaign Details (copy)
  required:
  - type
  - orderLineId
  - oLineId
`;

describe('Make a yaml', () => {
  const str = 'line\nnext\n';
  it('delLast works', () => {
    expect(delLast(str)).to.equal('line\n');
  });
  it('lastLine works', () => {
    expect(lastLine(str)).to.equal('next');
  });
  it('Makes a yaml', () => {
    const result = writeYamlSchema(0, OrderLinesConfig, 'OrderLines');
    console.log(result);
    expect(result).to.equal(schemaResult);
  });
  it('Makes params', () => {
    console.log(writeParams(0, OrderLinesConfig, 'OrderLines', 'path', false));
  });
});


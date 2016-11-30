/**
 * OrderLinesSchema
 * todo: description...
 */
/* eslint object-shorthand: 0 */
/* eslint func-names: 0 */
/* eslint consistent-return: 0 */

import _ from 'lodash';

const Enums = {
  values: () => ['one', 'shoe'],
};

const otherConfig = {
  orderLineId: {
    label: 'orderLineId',
    type: Date,
  },
  oLineId: {
    label: 'orderLineId',
    type: [Date],
  },
}

export const OrderLinesConfig = {
  type: {
    label: '2=reject, 3=approve',
    type: Number,
    allowedValues: [2, 3],
  },
  orderLineId: {
    label: 'orderLineId',
    type: Date,
  },
  oLineId: {
    label: 'orderLineId',
    type: [Date],
  },
  message: {
    label: 'Optional message to send with review',
    type: String,
    optional: true,
  },
  status: {
    type: Number,
    optional: true,
    allowedValues: Enums.values(),
    autoValue: 'one',
    uniforms: {
      enums: Enums.values(),
      help: 'A help string',
    },
    help: 'A help string',
    listParam: true,
    denySave: true,
  },
  orgIdToReview: {
    label: 'Org Id required to Review Next',
    type: String,
    optional: true,
    denySave: true,
    hiddenAPI: true, // only hidden in API, allowed in UI.
  },
  cpm: {
    // set by AdOps & calculations
    type: Number,
    label: 'Cost per mil',
    decimal: true,
    optional: true,
    min: 5,
    max: 50,
    defaultValue: 20,
    denySaveUnlessGlobalAdops: true,
  },
  campaign: {
    label: 'Parent Campaign Details (copy)',
    type: otherConfig,
    denormalizedCopy: true,
    optional: true,
    denySave: true,
  },
};

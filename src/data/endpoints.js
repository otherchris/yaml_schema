
export const endpoints = {
  orderLines: {
    post: {
      name: 'Add', // alias Create
      summary: 'Add an Order Line',
      description: `|
        You may only create an Order Line as a child of your own Order Line.
`,
      schema: OrderLinesAddConfig,
      func: OrderLinesAddFunc,
      returns: 'id', // string
    },
    get: {
      name: 'Search', // alias List
      summary: 'Search / List all OrderLineanizations',
      description: `|
        You can list all or filter with a search query.
        The result set is paginated.
`,
      schema: OrderLinesSearchConfig,
      func: OrderLinesSearchFunc,
      returns: [OrderLinesConfig], // array of records
    },
  },
  'orderLines/{_id}': {
    get: {
      name: 'View', // alias One, View
      summary: 'Return one Order Line',
      description: `|
        Get full details about an Order Line here.
`,
      schema: OrderLinesViewConfig,
      func: OrderLinesViewFunc,
      returns: OrderLinesConfig, // single record
    },
    patch: {
      name: 'Save', // alias Update
      summary: 'Edit an Order Line',
      description: `|
        Some Order Line data is editable, depending on the rights of the user.

        If you have an "orgadmin" role, you should be able to edit some of your own Order Line.
        If you have any "child" OrderLineanizations, you should also be able to edit them.
`,
      schema: OrderLinesEditConfig,
      func: OrderLinesEditFunc,
      returns: Boolean,
      // TODO REVIEW returns: OrderLinesConfig, // findOne
    },
    delete: {
      name: 'Delete', // alias List
      summary: 'Delete a child Order Line',
      description: `|
        You may only delete your Order Lines which are not deployed.
`,
      schema: OrderLinesDeleteConfig,
      func: OrderLinesDeleteFunc,
      returns: Boolean,
    },
  },
  'orderLines/{_id}/attachCreative': {
    patch: {
      name: 'Attach Creative', // alias Update
      summary: 'Attach a Creative to an Order Line',
      description: `|
        You can Attach an existing Creative, from your library, to an Order Line.

        NOTE: You may only add Creatives of a *type* allowed for this Order Line
        (no videos on display Order Lines).

        Here's a basic example.

        Before:

        ${code}
        {
          _id: 'myorderline',
          clickThroughUrl: 'http://example.com/path/page',
          creatives: []
        }
        ${code}

        Params:

        ${code}
        {
          orderLineId: 'myorderline',
          creativeId: 'mycreative',
        }
        ${code}

        After:

        ${code}
        {
          _id: 'myorderline',
          clickThroughUrl: 'http://example.com/path/page',
          creatives: [
            { _id: 'mycreative' },
          ]
        }
        ${code}
`,
      schema: OrderLinesAttachCreativeConfig,
      func: OrderLinesAttachCreativeFunc,
      returns: Boolean,
    },
  },
  'orderLines/{_id}/detachCreative': {
    patch: {
      name: 'Detach Creative', // alias Update
      summary: 'Detach a Creative to an Order Line',
      description: `|
        You can Detach an detached Creative, from your Order Line.

        Here's a basic example.

        Params:

        Before:

        ${code}
        {
          _id: 'myorderline',
          clickThroughUrl: 'http://example.com/path/page',
          creatives: [
            { _id: 'mycreative' },
          ]
        }
        ${code}

        /Params:

        ${code}
        {
          orderLineId: 'myorderline',
          creativeId: 'mycreative',
        }
        ${code}

        After:

        ${code}
        {
          _id: 'myorderline',
          clickThroughUrl: 'http://example.com/path/page',
          creatives: []
        }
        ${code}
`,
      schema: OrderLinesDetachCreativeConfig,
      func: OrderLinesDetachCreativeFunc,
      returns: Boolean,
    },
  },
  'orderLines/{_id}/attachBucket': {
    patch: {
      name: 'Attach Bucket', // alias Update
      summary: 'Attach a Bucket to an Order Line',
      description: `|
        You can Attach an existing Bucket, from your library, to an Order Line.

        NOTE: You may only add Buckets of a *type* allowed for this Order Line
        (no Mover buckets on B2C Order Lines).

        Here's a basic example.

        Before:

        ${code}
        {
          _id: 'myorderline',
          buckets: [],
        }
        ${code}

        /Params:

        ${code}
        {
          orderLineId: 'myorderline',
          bucketId: 'mybucket',
        }
        ${code}

        After:

        ${code}
        {
          _id: 'myorderline',
          buckets: [
            {
              _id: 'mybucket',
              name: 'My Bucket',
            }
          ]
        }
        ${code}
`,
      schema: OrderLinesAttachBucketConfig,
      func: OrderLinesAttachBucketFunc,
      returns: Boolean,
    },
  },
  'orderLines/{_id}/detachBucket': {
    patch: {
      name: 'Detach Bucket', // alias Update
      summary: 'Detach a Bucket to an Order Line',
      description: `|
        You can Detach an detached Bucket, from your Order Line.

        Here's a basic example.
        Params:

        ${code}
        {
          orderLineId: 'myorderline',
          bucketId: 'mybucket',
        }
        ${code}
`,
      schema: OrderLinesDetachBucketConfig,
      func: OrderLinesDetachBucketFunc,
      returns: Boolean,
    },
  },
  'orderLines/{_id}/submitForApproval': {
    post: {
      name: 'Submit for Approval',
      summary: 'Submit a processed orderline for approval by Orgadmin/Eltoro Admin',
      description: `|
        Once the order line is in a ready state, submit the orderline for approval ahead of
        deployment.

        Example:

        ${code}
        POST /orderLines/{your orderlineid}/submitForApproval
        {
          message: 'This orderline is ready for final review'
        }
        ${code}
      `,
    },
    schema: OrderLinesSubmitForApprovalConfig,
    func: OrderLinesSubmitForApprovalFunc,
  },
};

// export docs as needed
export default endpoints;

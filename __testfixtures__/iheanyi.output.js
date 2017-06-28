'use strict';

const {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} = require('graphql');

const generatedType1 = require('./generatedType1');

const generatedType0 = new GraphQLObjectType({
  name: 'GeneratedType0',
  fields: () => ({
    success: {
      type: GraphQLBoolean,
    },
    totalcount: {
      type: GraphQLInt,
    },
    data: {
      type: new GraphQLList(generatedType1),
    },
    pageoffset: {
      type: GraphQLInt,
    },
    pagemaxsize: {
      type: GraphQLInt,
    },
    sectionsfetchedcount: {
      type: GraphQLInt,
    },
    pathmode: {
      type: GraphQLString,
    },
    searchresultsconfigs: {
      type: GraphQLString,
    },
  }),
});
module.exports = generatedType0;

'use strict';

const {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} = require('graphql');

const generatedType2 = require('./generatedType2');

const generatedType3 = require('./generatedType3');

const generatedType1 = new GraphQLObjectType({
  name: 'GeneratedType1',
  fields: () => ({
    id: {
      type: GraphQLInt,
    },
    term: {
      type: GraphQLString,
    },
    termdesc: {
      type: GraphQLString,
    },
    coursereferencenumber: {
      type: GraphQLString,
    },
    partofterm: {
      type: GraphQLString,
    },
    coursenumber: {
      type: GraphQLString,
    },
    subject: {
      type: GraphQLString,
    },
    subjectdescription: {
      type: GraphQLString,
    },
    sequencenumber: {
      type: GraphQLString,
    },
    campusdescription: {
      type: GraphQLString,
    },
    scheduletypedescription: {
      type: GraphQLString,
    },
    coursetitle: {
      type: GraphQLString,
    },
    credithours: {
      type: GraphQLString,
    },
    maximumenrollment: {
      type: GraphQLInt,
    },
    enrollment: {
      type: GraphQLInt,
    },
    seatsavailable: {
      type: GraphQLInt,
    },
    waitcapacity: {
      type: GraphQLInt,
    },
    waitcount: {
      type: GraphQLInt,
    },
    waitavailable: {
      type: GraphQLInt,
    },
    crosslist: {
      type: GraphQLString,
    },
    crosslistcapacity: {
      type: GraphQLInt,
    },
    crosslistcount: {
      type: GraphQLInt,
    },
    crosslistavailable: {
      type: GraphQLInt,
    },
    credithourhigh: {
      type: GraphQLString,
    },
    credithourlow: {
      type: GraphQLInt,
    },
    credithourindicator: {
      type: GraphQLString,
    },
    opensection: {
      type: GraphQLBoolean,
    },
    linkidentifier: {
      type: GraphQLString,
    },
    issectionlinked: {
      type: GraphQLBoolean,
    },
    subjectcourse: {
      type: GraphQLString,
    },
    faculty: {
      type: new GraphQLList(generatedType2),
    },
    meetingsfaculty: {
      type: new GraphQLList(generatedType3),
    },
  }),
});
module.exports = generatedType1;

'use strict';

const {GraphQLBoolean, GraphQLObjectType, GraphQLString} = require('graphql');

const generatedType2 = new GraphQLObjectType({
  name: 'GeneratedType2',
  fields: () => ({
    bannerid: {
      type: GraphQLString,
    },
    category: {
      type: GraphQLString,
    },
    class: {
      type: GraphQLString,
    },
    coursereferencenumber: {
      type: GraphQLString,
    },
    displayname: {
      type: GraphQLString,
    },
    emailaddress: {
      type: GraphQLString,
    },
    primaryindicator: {
      type: GraphQLBoolean,
    },
    term: {
      type: GraphQLString,
    },
  }),
});
module.exports = generatedType2;

'use strict';

const {GraphQLList, GraphQLObjectType, GraphQLString} = require('graphql');

const generatedType4 = require('./generatedType4');

const generatedType3 = new GraphQLObjectType({
  name: 'GeneratedType3',
  fields: () => ({
    category: {
      type: GraphQLString,
    },
    class: {
      type: GraphQLString,
    },
    coursereferencenumber: {
      type: GraphQLString,
    },
    faculty: {
      type: new GraphQLList(GraphQLString),
    },
    meetingtime: {
      type: generatedType4,
    },
    term: {
      type: GraphQLString,
    },
  }),
});
module.exports = generatedType3;

'use strict';

const {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
} = require('graphql');

const generatedType4 = new GraphQLObjectType({
  name: 'GeneratedType4',
  fields: () => ({
    begintime: {
      type: GraphQLString,
    },
    building: {
      type: GraphQLString,
    },
    buildingdescription: {
      type: GraphQLString,
    },
    campus: {
      type: GraphQLString,
    },
    campusdescription: {
      type: GraphQLString,
    },
    category: {
      type: GraphQLString,
    },
    class: {
      type: GraphQLString,
    },
    coursereferencenumber: {
      type: GraphQLString,
    },
    credithoursession: {
      type: GraphQLInt,
    },
    enddate: {
      type: GraphQLString,
    },
    endtime: {
      type: GraphQLString,
    },
    friday: {
      type: GraphQLBoolean,
    },
    hoursweek: {
      type: GraphQLFloat,
    },
    meetingscheduletype: {
      type: GraphQLString,
    },
    monday: {
      type: GraphQLBoolean,
    },
    room: {
      type: GraphQLString,
    },
    saturday: {
      type: GraphQLBoolean,
    },
    startdate: {
      type: GraphQLString,
    },
    sunday: {
      type: GraphQLBoolean,
    },
    term: {
      type: GraphQLString,
    },
    thursday: {
      type: GraphQLBoolean,
    },
    tuesday: {
      type: GraphQLBoolean,
    },
    wednesday: {
      type: GraphQLBoolean,
    },
  }),
});
module.exports = generatedType4;

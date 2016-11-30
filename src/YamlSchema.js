import _ from 'lodash';

export const delLast = (str) => str.slice(0, str.slice(0, -1).lastIndexOf('\n')) + '\n';
export const lastLine = (str) => str.slice(str.slice(0, -1).lastIndexOf('\n') + 1, -1);

const ind = (x) => Array(x + 1).join(' ');

const line = (t, content) => `${ind(t)}${content}\n`;

export const writeYamlSchema = (t, config, name) => {
  let out = '';
  out += line(t, `${name}:`);
  out += writeProps(t + 2, config);
  const required = [];
  _.keys(config).forEach((key) => {
    if (!config[key].optional) {
      required.push(key)
    }
  });
  out += line(t + 2, 'required:');
  required.forEach((req) => {
    out += line(t + 2, `- ${req}`);
  });
  return out;
};

export const writeProps = (t, config) => {
  let out = '';
  out += line(t, 'type: object');
  out += line(t, 'properties:');
  _.keys(config).forEach((key) => {
    if (config[key] &&   // non empty
        !key.includes('.') && // not a subprop
        !_.has(config[key], 'blackbox') && // not a blackbox
        !config[key].hidden &&
        !config[key].hiddenAPI) {  // not hidden
      out += line(t + 2, `${key}:`);
      out += obj2Yaml(t + 4, config[key]);
    }
  });
  return out;
};

const obj2Yaml = (t, object) => {
  let out = ymlType(t, object);
  out += line(t, `description: ${getLabel(object)}`);

  if (_.has(object, 'help')) {
    out += line(t, 'additionalProperties:');
    out += line(t + 2, 'type: string');
  }
  return out;
};

const getLabel = (object) => object.label || 'No description provided';

const ymlType = (t, object) => {
  let out = '';
  const type = getType(object);
  if (type === 'array') {
    out += line(t, 'type: array');
    out += line(t, 'items:');
    out += ymlType(t + 2, _.extend(object, { type: object.type[0] }));
  } else if (type === 'date') {
    out += line(t, 'type: string');
    out += line(t, 'format: date');
  } else if (type === 'object') {
    out += writeProps(t, object.type);
  } else {
    out += line(t, `type: ${type}`);
  }
  if (object.allowedValues) {
    out += line(t, `enum: ${printArray(object.allowedValues)}`);
  }
  return out;
};

const getType = (object) => {
  console.log('OBJ: ', object);
  const simpleTypes = [String, Number, Boolean, Date];

  // simple
  if (simpleTypes.indexOf(object.type) >= 0) {
    return getSimpleType(object);
  }

  // array
  if (object.type[0]) {
    return 'array';
  }

  // else
  return 'object';
};

const getSimpleType = (object) => {
  if (object.type === Number) {
    return object.decimal ? 'number' : 'integer';
  }
  return _.toLower(object.type.name);
};

const getArrayItemType = (object) => getType(_.extend(object, { type: object.type[0] }));

const printArray = (arr) => {
  let out = '[';
  arr.forEach((item) => {
    if (typeof item === 'string') {
      out += `'${item}', `;
    } else {
      out += `${item}, `;
    }
  });
  out = out.slice(0, -2);
  out += ']';
  return out;
};

export const writeParams = (t, config, name, _in, skipId) => {
  let out = ``;
  out += line(t, `${name}:`);
  _.keys(config).forEach((key) => {
    if (key !== '_id' || !skipId) {
      out += line(t, `- name: ${key}`);
      out += line(t + 2, `in: ${_in}`);
      out += obj2Yaml(t + 2, config[key]);
      if(!config[key].optional) {
        out += line(t + 2, `required: true`);
      }
      if(config[key].allowedValues) {
        out += line(t + 2, `enum: ${printArray(config[key].allowedValues)}`);
      }
    }
  });
  return out;
};
/*
//fakery
static RegEx() {
  return {Url: 'urlregex'};
  }

  static extendOptions(obj) {};
  static messages(obj) {};
}
*/

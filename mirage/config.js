import {
  discoverEmberDataModels,
  applyEmberDataSerializers,
} from 'ember-cli-mirage';
import { createServer } from 'miragejs';

export default function (config) {
  let finalConfig = {
    ...config,
    models: { ...discoverEmberDataModels(), ...config.models },
    routes() {
      this.namespace = 'api';
      this.get('/employees', function (schema) {
        return schema.employees.all();
      });
      this.post('/employees', (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        return schema.employees.create(attrs);
      });
      this.patch('/employees/:id', (schema, request) => {
        const id = request.params.id;
        const employee = schema.employees.find(id);
        const attrs = JSON.parse(request.requestBody);
        const manager = attrs.data.relationships.manager.data.id;
        employee.update('managerId', manager);
        return employee;
      });

      this.get('/employees/:id', (schema, request) => {
        const id = request.params.id;
        return schema.employees.find(id);
      });
    },
    serializers: applyEmberDataSerializers(config.serializers),
  };

  return createServer(finalConfig);
}

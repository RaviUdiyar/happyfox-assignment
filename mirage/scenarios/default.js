import EMPLOYEES from '../fixtures/employees';

export default function (server) {
  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.
  */
  // server.createList('post', 10);
  // server.loadFixtures();

  EMPLOYEES.forEach((employeeData) => {
    const { managerId, ...otherAttrs } = employeeData;
    const manager = managerId ? server.schema.employees.find(managerId) : null;
    server.create('employee', { ...otherAttrs, manager });
  });
}

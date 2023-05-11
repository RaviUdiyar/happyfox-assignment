const EMPLOYEES = [
  {
    id: '1',
    name: 'Mark Hill',
    designation: 'Chief Executive Officer',
    team: 'Management',
  },
  {
    id: '2',
    name: 'Joe Linux',
    designation: 'Chief Technology Officer',
    team: 'Management',
    managerId: '1',
  },
  {
    id: '3',
    name: 'Linda May',
    designation: 'Chief Business Officer',
    team: 'Management',
    managerId: '1',
  },
  {
    id: '4',
    name: 'John Green',
    designation: 'Chief Accounting Officer',
    team: 'Accounting',
    managerId: '1',
  },
  {
    id: '5',
    name: 'Ron Blomquist',
    designation: 'Chief Information',
    team: 'IT',
    managerId: '2',
  },
  {
    id: 6,
    name: 'Michael Rubin',
    designation: 'Chief Innovation Officer',
    team: 'IT',
    managerId: 5,
  },
  {
    id: 7,
    name: 'Alice Lopez',
    designation: 'Chief Communications Officer',
    team: 'Marketing',
    managerId: 3,
  },
  {
    id: 8,
    name: 'Mary Johnson',
    designation: 'Chief Brand Officer',
    team: 'Marketing',
    managerId: 7,
  },
  {
    id: 9,
    name: 'Kirk Douglas',
    designation: 'Chief Business Development Officer',
    team: 'Business Development',
    managerId: 7,
  },
  {
    id: 10,
    name: 'Eric Reel',
    designation: 'Chief Customer Officer',
    team: 'Customer Success',
    managerId: 4,
  },
];

export default EMPLOYEES;

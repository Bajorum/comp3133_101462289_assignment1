const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar Date

  type User {
    username: String!
    email: String!
  }

  type Employee {
    _id: ID!
    first_name: String!
    last_name: String!
    email: String!
    gender: String!
    designation: String!
    salary: Float!
    date_of_joining: Date!
    department: String!
    employee_photo: String!
  }

  type Query {
    login(username: String, email: String, password: String!): String
    getAllEmployees: [Employee]
    searchEmployeeById(eid: ID!): Employee
    searchEmployeeByDesignationOrDepartment(designation: String, department: String): [Employee]
  }

  type Mutation {
    signup(username: String!, email: String!, password: String!): User
    addEmployee(input: EmployeeInput!): Employee
    updateEmployee(eid: ID!, input: EmployeeInput!): Employee
    deleteEmployee(eid: ID!): String
  }

  input EmployeeInput {
    first_name: String!
    last_name: String!
    email: String!
    gender: String!
    designation: String!
    salary: Float!
    date_of_joining: Date!
    department: String!
    employee_photo: String!
  }
`;

module.exports = typeDefs;

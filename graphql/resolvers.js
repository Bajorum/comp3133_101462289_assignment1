const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Employee = require('../models/Employee');

const resolvers = {
  Query: {
    login: async (_, { username, email, password }) => {
      const user = await User.findOne({ $or: [{ username }, { email }] });
      if (!user) throw new Error('User not found');
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw new Error('Invalid password');
      return jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    },
    getAllEmployees: async () => await Employee.find(),
    searchEmployeeById: async (_, { eid }) => await Employee.findById(eid),
    searchEmployeeByDesignationOrDepartment: async (_, { designation, department }) => {
      const query = {};
      if (designation) query.designation = designation;
      if (department) query.department = department;
      return await Employee.find(query).exec();
    }
  },

  Mutation: {
    signup: async (_, { username, email, password }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, email, password: hashedPassword });
      await user.save();
      return user;
    },
    addEmployee: async (_, { input }) => {
      const employee = new Employee(input);
      await employee.save();
      return employee;
    },
    updateEmployee: async (_, { eid, input }) => {
      const employee = await Employee.findByIdAndUpdate(eid, input, { new: true });
      return employee;
    },
    deleteEmployee: async (_, { eid }) => {
      await Employee.findByIdAndDelete(eid);
      return 'Employee deleted successfully';
    }
  }
};

module.exports = resolvers;

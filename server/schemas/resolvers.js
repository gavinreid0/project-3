const { AuthenticationError } = require("apollo-server-express");
const { Profile } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    async getProfile() {
      try {
        const profiles = await Profile.find();
        return profiles;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
module.exports = resolvers;

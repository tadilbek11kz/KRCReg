import gql from 'graphql-tag';
import { makeExecutableSchema } from 'graphql-tools';

import UserTypes from '../../api/Users/types';
import UserQueries from '../../api/Users/queries';
import UserMutations from '../../api/Users/mutations';

import UserSettingsTypes from '../../api/UserSettings/types';
import UserSettingsQueries from '../../api/UserSettings/queries';
import UserSettingsMutations from '../../api/UserSettings/mutations';

import OAuthQueries from '../../api/OAuth/queries';

import '../../api/webhooks';

const schema = {
  typeDefs: gql`
    ${UserTypes}
    ${UserSettingsTypes}

    type Query {
      user(_id: String): User
      users(currentPage: Int, perPage: Int, search: String): Users
      userSettings: [UserSetting]
      exportUserData: UserDataExport
      oAuthServices(services: [String]): [String]
    }

    type Mutation {
      updateUser(user: UserInput): User
      removeUser(_id: String): User
      addUserSetting(setting: UserSettingInput): UserSetting
      updateUserSetting(setting: UserSettingInput): UserSetting
      removeUserSetting(_id: String!): UserSetting
      sendVerificationEmail: User
      sendWelcomeEmail: User
    }
  `,
  resolvers: {
    Query: {
      ...UserQueries,
      ...UserSettingsQueries,
      ...OAuthQueries,
    },
    Mutation: {
      ...UserMutations,
      ...UserSettingsMutations,
    },
  },
};

export default makeExecutableSchema(schema);

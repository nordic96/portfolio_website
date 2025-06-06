import gql from 'graphql-tag';

export const typeDef = gql`
    type Project {
        id: ID!
        name: String!
        devyear: Int!
        videolink: String
        projectlink: String
        medialink: String
        tags: [String]!
        desc: String!
    }

    type Query {
        projects: [Project!]!
    }
`;

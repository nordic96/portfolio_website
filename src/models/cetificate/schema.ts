import gql from 'graphql-tag';

export const typeDef = gql`
    type Certificate {
        id: ID!
        name: String!
        credentials_url: String!
        year_obtained: String!
        theme_color: String
        logo_src: String
    }

    type Query {
        certificates: [Certificate!]!
    }
`;
